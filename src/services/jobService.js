import axios from 'axios';

// API base URL - update this to match your backend URL
const API_BASE_URL = 'http://localhost:8181/api';

// Create API instance with default config
const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  withCredentials: true,
  timeout: 30000, // 30 second timeout
  validateStatus: function (status) {
    // Don't reject on HTTP status codes
    return status >= 200 && status < 500;
  }
});

// Request interceptor
API.interceptors.request.use(
  config => {
    // Add any request headers or tokens here if needed
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor
API.interceptors.response.use(
  response => response,
  error => {
    console.error('API Response Error:', error);
    return Promise.reject(error);
  }
);

const jobService = {
  /**
   * Fetches job listings with filtering and pagination
   * @param {Object} params - Query parameters
   * @param {number} [params.page=0] - Page number (0-based)
   * @param {number} [params.size=10] - Number of items per page
   * @param {string} [params.search] - Search term for job title/description
   * @param {string} [params.location] - Location filter
   * @param {number} [params.experience] - Years of experience
   * @param {string} [params.employmentType] - Employment type
   * @param {string} [params.jobType] - Job type
   * @returns {Promise<{success: boolean, jobs: Array, pagination: Object, error?: string}>}
   */
  getPublicJobListings: async function(params = {}) {
    try {
      const {
        page = 0,
        size = 10,
        search,
        location,
        experience,
        employmentType,
        jobType,
      } = params;

      // Build request body for the backend
      const requestBody = {
        page: Math.max(0, parseInt(page, 10)),
        size: Math.min(100, Math.max(1, parseInt(size, 10))),
        ...(search && { searchText: search }),
        ...(location && { location }),
        ...(experience !== undefined && { experience: parseInt(experience, 10) }),
        ...(employmentType && { employmentType }),
        ...(jobType && { jobType })
      };

      const apiUrl = `${API_BASE_URL}/v1/jobresource/public/joblist`;
      console.log('Fetching jobs from:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
          console.error('API Error Response:', errorData);
        } catch (e) {
          console.error('Failed to parse error response:', e);
        }
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Raw API Response:', JSON.stringify(responseData, null, 2));
      
      if (!responseData.jobs || !Array.isArray(responseData.jobs)) {
        console.error('Invalid response format - jobs array not found');
        throw new Error('Invalid response format: jobs array not found');
      }

      // Log first job before mapping
      if (responseData.jobs.length > 0) {
        console.log('First job before mapping:', JSON.stringify(responseData.jobs[0], null, 2));
      }

      // Map the backend response to frontend format
      const jobs = responseData.jobs.map((job, index) => {
        const mappedJob = this.mapJobResponse(job);
        console.log(`Job ${index} after mapping:`, JSON.stringify(mappedJob, null, 2));
        return mappedJob;
      });

      const pagination = responseData.pagination || {
        page: parseInt(page, 10),
        size: parseInt(size, 10),
        totalPages: 1,
        totalElements: jobs.length
      };

      return {
        success: true,
        jobs,
        pagination
      };

    } catch (error) {
      console.error('Error in getPublicJobListings:', {
        message: error.message,
        stack: error.stack
      });
      
      return { 
        success: false, 
        error: error.message || 'Failed to fetch jobs',
        jobs: []
      };
    }
  },

  /**
   * Maps backend job data to frontend format
   * @param {Object} job - Job data from backend
   * @returns {Object} Mapped job data
   */
  mapJobResponse: function(job) {
    if (!job) {
      console.error('mapJobResponse called with null/undefined job');
      return null;
    }
    console.log('Mapping job with ID:', job.id || 'unknown');
    
    // Format experience for display
    const experienceDisplay = job.experience 
      ? `${job.experience} ${job.expType || 'Years'}`
      : 'Experience not specified';
    
    // Format salary for display
    let displaySalary = '';
    if (job.salary) {
      displaySalary = job.salary;
    } else if (job.minSalary || job.maxSalary) {
      const min = job.minSalary ? `${job.currency || '₹'}${job.minSalary.toLocaleString()}` : '';
      const max = job.maxSalary ? `${job.currency || '₹'}${job.maxSalary.toLocaleString()}` : '';
      displaySalary = min && max ? `${min} - ${max}` : min || max;
    }

    // Map all required fields
    return {
      // Core job information
      id: job.id?.toString() || '',
      jobId: job.id, // Keep original ID as number
      jobTitle: job.job_Title || job.jobTitle || 'No Title',
      title: job.job_Title || job.jobTitle || 'No Title',
      
      // Company information
      company: job.company_Name || job.company || 'Company Not Specified',
      companyName: job.company_Name || job.company || 'Company Not Specified',
      clientName: job.client_Name || '',
      industryName: job.industry_Name || '',
      
      // Job details
      position: job.position || '',
      eligibility: job.eligibility || '',
      experience: job.experience || 'Experience not specified',
      experienceValue: job.experience || 0,
      expType: job.expType,
      
      // Salary information
      salary: displaySalary,
      minSalary: job.minSalary || 0,
      maxSalary: job.maxSalary || 0,
      currency: job.currency || '₹',
      payFrequency: job.payFrequency || '',
      
      // Location and type
      location: job.location || 'Location Not Specified',
      vacancies: job.vacancies || '',
      workType: job.work_Type || job.workType || 'Full-time',
      employmentType: job.employee_Type || job.employmentType || 'Permanent',
      
      // Dates
      dueDate: job.due_Date || job.dueDate || '',
      createdDate: job.createdDate || new Date().toISOString(),
      updatedDate: job.updatedDate || new Date().toISOString(),
      
      // Descriptions and requirements
      jobDescription: job.job_Description || job.jobDescription || '',
      jobRequirement: job.job_Requirement || job.jobRequirement || '',
      documentsRequired: job.documentsRequired || '',
      
      // Status and type
      status: job.status || 0,
      jobType: job.jobType || '',
      isActive: job.isActive !== undefined ? job.isActive : true,
      isDeleted: job.isDeleted || false,
      
      // Additional fields for UI
      jobCode: job.job_Code || job.jobCode || '',
      
      // For backward compatibility with existing components
      rating: job.rating || 0,
      reviews: job.reviews || 0,
      shift: job.shift || 'Mon - Sat, 9:00AM - 6:00PM',
      skills: job.skills || [],
      
      // Don't include original job properties to avoid overwriting mapped fields
      // ...job
    };
  },

  // Add other job-related service methods here as needed
};

export { jobService as default };