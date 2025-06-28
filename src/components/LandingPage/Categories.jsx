import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import '../styles/Categories.css'
import categorieslogo from '../../assets/Images/Categories/jobs.svg'
import jobService from '../../services/jobService.js'

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = async (category) => {
    try {
      // Navigate to job listings page with category filter
      navigate('/jobs', {
        state: { category: category }
      });
    } catch (error) {
      console.error('Error handling category click:', error);
    }
  };

  const categories = [
    { title: 'Remote', jobs: '500+' },
    { title: 'Freshers', jobs: '500+' },
    { title: 'Engineering', jobs: '500+' },
    { title: 'Sales & Marketing', jobs: '500+' },
    { title: 'Design & Media', jobs: '500+' },
    { title: 'Education & Teachers', jobs: '500+' },
    { title: 'Home service Providers', jobs: '500+' },
    { title: 'Driver & Transportation', jobs: '500+' }
  ]

  return (
    <section className="categories-section">
      <Container>
        <h2 className="section-title">Browse popular categories</h2>
        <div className='categories-grid'>
          {categories.map((category, index) => (
            <div className="category-card" 
              key={index} 
              onClick={() => handleCategoryClick(category.title)}>
              <p className="job-count">
              <img 
                  src={categorieslogo} 
                  alt="Jobs icon" 
                  className="job-icon" 
                  style={{
                    width: '14.147px',
                    height: '14.147px',
                    flexShrink: 0,
                    strokeWidth: '1px',
                    stroke: '#808080'
                  }}
                />{category.jobs} jobs</p>
              <div className="category-circle">
                <h3 className="category-title">{category.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Categories