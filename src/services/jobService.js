import axios from 'axios';

// API base URL - update this to match your backend URL
const API_BASE_URL = 'http://localhost:8181/api'; // Include /api in the base URL

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
    return status >= 200 && status < 500; // Resolve only if the status code is less than 500
  }
});

// Add a request interceptor to handle errors
API.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
API.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      console.error('Response error:', error.response.data);
    } else if (error.request) {
      console.error('Request error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

const jobService = {
  // Fetch public job listings
  getPublicJobListings: async function(searchParams = {}) {
    try {
      const { 
        search = '', 
        location = '', 
        experience = '', 
        page = 0, 
        size = 10,
        jobTitle = '',
        employmentType = '',
        jobType = ''
      } = searchParams;
      
      console.log('Fetching public job listings with params:', { 
        search, 
        location, 
        experience, 
        page, 
        size,
        jobTitle,
        employmentType,
        jobType
      });
      
      // Prepare request body according to API documentation
      const requestBody = {
        page: Number(page),
        size: Number(size)
      };
      
      // Add optional filters if provided
      if (search) requestBody.jobTitle = search;
      if (location) requestBody.location = location;
      if (experience) requestBody.experience = Number(experience);
      if (jobTitle) requestBody.jobTitle = jobTitle;
      if (employmentType) requestBody.employmentType = employmentType;
      if (jobType) requestBody.jobType = jobType;
      
      const requestUrl = `${API_BASE_URL}/v1/jobresource/public/joblist`;
      console.log('Sending POST request to:', requestUrl);
      console.log('Request body:', JSON.stringify(requestBody, null, 2));
      
      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      
      console.log('API Response Status:', response.status);
      
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
      console.log('API Response Data:', responseData);
      
      // Handle different possible response formats
      let jobs = [];
      let pagination = {};
      
      if (Array.isArray(responseData)) {
        jobs = responseData;
      } else if (responseData.content) {
        // Handle Spring Data Page format
        jobs = responseData.content || [];
        pagination = {
          page: responseData.number,
          size: responseData.size,
          totalPages: responseData.totalPages,
          totalElements: responseData.totalElements
        };
      } else if (responseData.jobs) {
        // Handle custom format with jobs array
        jobs = responseData.jobs || [];
        pagination = responseData.pagination || {};
      }
      
      return {
        success: true,
        jobs: jobs,
        pagination: pagination
      };
      
    } catch (error) {
      console.error('Error in getPublicJobListings:', {
        message: error.message,
        stack: error.stack,
        ...(error.response && {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data
        })
      });
      
      return { 
        success: false, 
        error: error.message || 'Failed to fetch jobs',
        jobs: []
      };
    }
  },
  
  // Map backend response to frontend format
  mapJobResponse: function(job) {
    return {
      id: job.id,
      jobTitle: job.job_title || job.jobTitle || 'N/A',
      clientName: job.client_name || job.clientName || 'N/A',
      company: job.company_name || job.company || 'N/A',
      location: job.location || 'N/A',
      technology: job.technology || (job.skills ? job.skills.join(',') : 'N/A'),
      workType: job.work_type || job.workType || 'N/A',
      createdDate: job.created_date || job.postedDate || 'N/A',
      jobStatus: job.status || 'N/A',
      experience: job.experience || 'N/A',
      salary: job.salary || 'N/A',
      minSalary: job.min_salary || 'N/A',
      maxSalary: job.max_salary || 'N/A',
      currency: job.currency || '',
      payFrequency: job.pay_frequency || '',
      industryName: job.industry_name || job.industryName || 'N/A',
      position: job.position || 'N/A',
      jobCode: job.job_code || job.jobCode || 'N/A',
      dueDate: job.due_date || job.dueDate || 'N/A',
      vacancies: job.vacancies || 'N/A',
      description: job.job_description || job.description || 'N/A'
    };
  },

  // Get hot jobs (matches the older version's loadsjobs function)
  getHotJobs: async function() {
    try {
      const data = { location: "", salary: "", workAuthorizationData: "" };
      const response = await API.post("/jobresource/get/hotjob", data);
      
      if (response.data.status === true) {
        return {
          status: true,
          showdata: true,
          isNoData: false,
          jobs: response.data.jobs
        };
      } else if (response.data.status === false) {
        return {
          status: false,
          showdata: true,
          isNoData: true,
          jobs: []
        };
      }
    } catch (error) {
      console.error("Error fetching hot jobs:", error);
      throw error;
    }
  },

  // Get jobs by category
  getJobsByCategory: async function(category, filterData = {}) {
    try {
      const data = {
        ...filterData,
        category: category,
        status: 1 // Active jobs only
      };

      console.log('Fetching jobs with data:', data);
      const response = await API.post('/api/v1/jobresource/public/joblist', data);
      
      console.log('API Response:', response.data);
      
      if (response.data && response.data.status) {
        const mappedJobs = response.data.jobs ? response.data.jobs.map(job => ({
          id: job.id,
          jobTitle: job.jobTitle || job.job_title || 'N/A',
          clientName: job.clientName || job.client_name || 'N/A',
          company: job.company || job.company_name || 'N/A',
          location: job.location || 'N/A',
          technology: job.technology || (job.skills ? job.skills.join(', ') : 'N/A'),
          workType: job.workType || job.work_type || 'N/A',
          experience: job.experience || 'N/A',
          salary: job.salary || 'N/A',
          minSalary: job.min_salary || job.minSalary || 'N/A',
          maxSalary: job.max_salary || job.maxSalary || 'N/A',
          currency: job.currency || '',
          payFrequency: job.pay_frequency || job.payFrequency || 'N/A',
          description: job.job_description || job.description || 'N/A',
          createdDate: job.created_date || job.createdDate || 'N/A',
          dueDate: job.due_date || job.dueDate || 'N/A',
          jobStatus: job.status || 'N/A',
          industryName: job.industry_name || job.industryName || 'N/A',
          position: job.position || 'N/A',
          jobCode: job.job_code || job.jobCode || 'N/A',
          vacancies: job.vacancies || 'N/A'
        })) : [];

        return {
          status: true,
          showdata: true,
          isNoData: mappedJobs.length === 0,
          jobs: mappedJobs
        };
      } else {
        console.warn('API returned non-success status:', response.data);
        return {
          status: false,
          showdata: true,
          isNoData: true,
          jobs: [],
          message: response.data?.message || 'Failed to fetch jobs'
        };
      }
    } catch (error) {
      console.error("Error fetching jobs by category:", error);
      if (error.response) {
        console.error('Response error:', error.response.data);
      } else if (error.request) {
        console.error('Request error:', error.request);
      } else {
        console.error('Error:', error.message);
      }
      throw error;
    }
  },

  // Get country list (matches the older version)
  getCountryList: async function() {
    try {
      const response = await API.get("/commonresource/countrylist");
      return response.data.countrylist;
    } catch (error) {
      console.error("Error fetching country list:", error);
      throw error;
    }
  },

  // Get work authorization list (matches the older version)
  getWorkAuthorizationList: async function() {
    try {
      const response = await API.get("/settingsresource/settingworkauthorization/list/all");
      return response.data.settingsWorkAuthorization.map(x => ({
        label: x.workAuthorizationName,
        value: x.id
      }));
    } catch (error) {
      console.error("Error fetching work authorization list:", error);
      throw error;
    }
  },

  // Get hot candidates (matches the older version's loadcandidates function)
  getHotCandidates: async function() {
    try {
      const data = { location: "", workAuthorization: [] };
      const response = await API.post("/candidateresource/get/tech/hotcandidate", data);
      
      if (response.data && response.data.recordinfo) {
        return {
          status: true,
          candshowdata: true,
          candisNoData: false,
          candidates: response.data.recordinfo
        };
      } else {
        return {
          status: false,
          candshowdata: true,
          candisNoData: true,
          candidates: []
        };
      }
    } catch (error) {
      console.error("Error fetching hot candidates:", error);
      throw error;
    }
  },

  // Search jobs with category filtering
  searchJobs: async function(searchQuery, locationQuery, experienceLevel, category = '') {
    console.log('[jobService] Using mock data instead of API');
    
    // Generate sample data based on search parameters
    const generateSampleJobs = (count = 5) => {
      const titles = [
        'Senior Software Engineer',
        'Frontend Developer',
        'Backend Developer',
        'Full Stack Developer',
        'UI/UX Designer',
        'DevOps Engineer',
        'Product Manager'
      ];
      
      const companies = [
        'TechCorp',
        'DevSolutions',
        'WebCraft',
        'CodeMasters',
        'DigitalHive'
      ];
      
      const locations = ['Remote', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad'];
      const skillsList = [
        ['JavaScript', 'React', 'Node.js'],
        ['Python', 'Django', 'PostgreSQL'],
        ['Java', 'Spring Boot', 'Microservices'],
        ['React', 'TypeScript', 'Redux'],
        ['AWS', 'Docker', 'Kubernetes']
      ];
      
      return Array.from({ length: count }, (_, i) => ({
        id: `job-${i + 1}`,
        title: titles[Math.floor(Math.random() * titles.length)],
        company: companies[Math.floor(Math.random() * companies.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        salary: `₹${Math.floor(Math.random() * 10 + 5)},00,000 - ₹${Math.floor(Math.random() * 10 + 10)},00,000`,
        description: `This is a sample job description for the ${titles[Math.floor(Math.random() * titles.length)]} position.`,
        postedDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
        skills: skillsList[Math.floor(Math.random() * skillsList.length)]
      }));
    };
    
    // Generate sample companies
    const generateSampleCompanies = (count = 3) => {
      const companyNames = [
        'TechCorp',
        'DevSolutions',
        'WebCraft',
        'CodeMasters',
        'DigitalHive'
      ];
      
      const locations = ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune'];
      
      return companyNames.slice(0, count).map((name, i) => ({
        id: `company-${i + 1}`,
        name,
        logo: '/src/assets/Images/JobListings/briefcase.svg',
        description: `${name} is a leading technology company specializing in software development and IT solutions.`,
        location: locations[Math.floor(Math.random() * locations.length)],
        jobsAvailable: Math.floor(Math.random() * 10) + 1
      }));
    };
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return mock data
    const jobs = generateSampleJobs(8);
    const companies = generateSampleCompanies(4);
    
    // Filter based on search query if provided
    const filteredJobs = searchQuery 
      ? jobs.filter(job => 
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      : jobs;
    
    // Filter based on location if provided
    const locationFilteredJobs = locationQuery
      ? filteredJobs.filter(job => 
          job.location.toLowerCase().includes(locationQuery.toLowerCase())
        )
      : filteredJobs;
    
    console.log('[jobService] Generated mock data:', {
      jobs: locationFilteredJobs.length,
      companies: companies.length,
      searchQuery,
      locationQuery,
      experienceLevel,
      category
    });
    
    return {
      status: true,
      showdata: true,
      isNoData: locationFilteredJobs.length === 0 && companies.length === 0,
      jobs: locationFilteredJobs,
      companies,
      _debug: {
        status: 'mock_data',
        jobsCount: locationFilteredJobs.length,
        companiesCount: companies.length
      }
    };
  }
};

export default jobService;
//   //     const response = await axios.get(`${API_BASE_URL}/settingsresource/settingworkauthorization/list/all`);
//   //     return response.data.settingsWorkAuthorization.map(x => ({
//   //       label: x.workAuthorizationName,
//   //       value: x.id
//   //     }));
//   //   } catch (error) {
//   //     console.error("Error fetching work authorization list:", error);
//   //     throw error;
//   //   }
//   // }
  
// };

// export default jobService;
