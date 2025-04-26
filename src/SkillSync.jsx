import React, { useState } from "react";
import {
  Search,
  Users,
  Book,
  MessageSquare,
  ChevronRight,
  ArrowRight,
  X,
} from "lucide-react";

const Modal = ({ title, onClose, children }) => (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1000 }}
    >
      <div
        className="bg-white p-4 rounded shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0 text-dark">{title}</h4>
          <button className="btn btn-sm" onClick={onClose} type="button">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );

    const sampleTutors = [
    {
      id: 1,
      name: "Alex Johnson",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      domains: ["Web Development", "UI/UX Design"],
      rating: 4.9,
      reviews: 128,
      bio: "Senior Full Stack Developer with 8 years of experience"
    },
    {
      id: 2,
      name: "Sarah Miller",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      domains: ["Data Science", "Artificial Intelligence"],
      rating: 4.8,
      reviews: 95,
      bio: "Data Scientist specializing in ML and deep learning"
    },
    {
      id: 3,
      name: "Michael Chen",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      domains: ["Mobile Development", "DevOps"],
      rating: 4.7,
      reviews: 76,
      bio: "Mobile architect and cloud specialist"
    }
  ];



export default function SkillSync() {
  // State variables
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [showMoreMatches, setShowMoreMatches] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showDomains, setShowDomains] = useState(false);
const [selectedDomains, setSelectedDomains] = useState([]);
const [tutors, setTutors] = useState([]);
const [currentTutorIndex, setCurrentTutorIndex] = useState(0);
const [swipeDirection, setSwipeDirection] = useState(null)
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/1.jpg" // Default profile image
  });

  

  // Additional matches that appear when "Show more" is clicked
  const additionalMatches = [
    {
      initials: "UX",
      title: "UX Designer",
      subtitle: "Seeking feedback",
      color: "info",
    },
    {
      initials: "RN",
      title: "React Native Dev",
      subtitle: "Mobile projects",
      color: "danger",
    },
  ];

  // All matches combined
  const initialMatches = [
    {
      initials: "JS",
      title: "JavaScript Expert",
      subtitle: "Available now",
      color: "primary",
    },
    {
      initials: "PY",
      title: "Python Enthusiast",
      subtitle: "Learning Django",
      color: "success",
    },
    {
      initials: "ML",
      title: "Machine Learning",
      subtitle: "Seeking study group",
      color: "warning",
    },
  ];
  

  

  const allMatches = [
    ...initialMatches,
    ...(showMoreMatches ? additionalMatches : []),
  ];
  const LogoutModal = ({ onClose, onConfirm }) => (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
    >
      <div
        className="bg-white p-4 rounded-3 shadow-lg"
        style={{ maxWidth: "350px", width: "100%" }}
      >
        <div className="text-center">
          <div className="mb-4">
            <X size={48} className="text-danger" />
          </div>
          <h4 className="text-dark mb-3">Logout?</h4>
          <p className="text-muted">Are you sure you want to logout?</p>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <button 
              className="btn btn-outline-secondary" 
              onClick={onClose}
              style={{ minWidth: "100px" }}
              disabled={isLoggingOut} // Disable during loading
            >
              Cancel
            </button>
            <button 
              className="btn btn-danger" 
              onClick={onConfirm}
              style={{ minWidth: "100px" }}
              disabled={isLoggingOut} // Disable during loading
            >
              {isLoggingOut ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Logging out...
                </>
              ) : "Logout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginUsername && loginPassword) {
      setIsLoggingIn(true);
      
      setTimeout(() => {
        setIsLoggedIn(true);
        setIsLoggingIn(false);
        setShowLoginModal(false);
        setShowDomains(true); // Show domain selection
        setLoginUsername("");
        setLoginPassword("");
        setUserProfile({
          name: loginUsername,
          image: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 50)}.jpg`
        });
      }, 1500);
    }
  };
  // Handle signup form submission
  const handleSignup = (e) => {
    e.preventDefault();
    if (signupUsername && signupPassword && signupEmail) {
      setIsLoggedIn(true);
      setShowSignupModal(false);
      setSignupUsername("");
      setSignupPassword("");
      setSignupEmail("");
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggingOut(true); // Show loading popup
    
    // Simulate logout process (replace with actual API call if needed)
    setTimeout(() => {
      setIsLoggedIn(false);
      setIsLoggingOut(false);
      setShowLogoutModal(false);
      // Add any other logout cleanup here
    }, 1500); // 1.5 second delay for demo
  };

  // Handle scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };
  const DomainSelection = ({ onComplete }) => {
    const domains = [
      { id: 1, name: "Web Development", icon: "💻", color: "primary" },
      { id: 2, name: "Data Science", icon: "📊", color: "info" },
      { id: 3, name: "Mobile Development", icon: "📱", color: "success" },
      { id: 4, name: "UI/UX Design", icon: "🎨", color: "warning" },
      { id: 5, name: "DevOps", icon: "⚙️", color: "danger" },
      { id: 6, name: "Artificial Intelligence", icon: "🧠", color: "dark" },
    ];
  
    const toggleDomain = (domain) => {
      setSelectedDomains(prev => 
        prev.includes(domain.id)
          ? prev.filter(id => id !== domain.id)
          : [...prev, domain.id]
      );
    };
  
    return (
      <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
           style={{ 
             backgroundColor: "rgba(0,0,0,0.85)", 
             zIndex: 1050,
             animation: "fadeIn 0.5s ease-out"
           }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <h2 className="text-white mb-4 animate__animated animate__fadeInDown">
                What would you like to explore today?
              </h2>
              <p className="text-light mb-5 animate__animated animate__fadeIn animate__delay-1s">
                Select your areas of interest to find perfect matches
              </p>
              
              <div className="row g-4">
                {domains.map((domain, index) => (
                  <div 
                    key={domain.id} 
                    className="col-md-4 col-6"
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`,
                      opacity: 0
                    }}
                  >
                    <div 
                      className={`card domain-card border-0 h-100 transition-all ${selectedDomains.includes(domain.id) ? 'selected' : ''}`}
                      onClick={() => toggleDomain(domain)}
                      style={{
                        cursor: "pointer",
                        background: `var(--bs-${domain.color}-bg)`,
                        transform: selectedDomains.includes(domain.id) ? "translateY(-5px)" : "none"
                      }}
                    >
                      <div className="card-body text-center p-4">
                        <div 
                          className="domain-icon mb-3 mx-auto rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: "60px",
                            height: "60px",
                            fontSize: "24px",
                            background: `var(--bs-${domain.color})`,
                            color: "white"
                          }}
                        >
                          {domain.icon}
                        </div>
                        <h5 className="mb-0 text-white">{domain.name}</h5> {/* Added text-white here */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                className="btn btn-primary btn-lg mt-5 px-5 animate__animated animate__fadeIn animate__delay-1s"
                onClick={() => {
                  setShowDomains(false);
                  onComplete();
                }}
                disabled={selectedDomains.length === 0}
                style={{
                  transition: "all 0.3s",
                  transform: selectedDomains.length > 0 ? "scale(1.05)" : "none"
                }}
              >
                Continue with {selectedDomains.length} {selectedDomains.length === 1 ? 'domain' : 'domains'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes fadeInUp {
    from { 
      opacity: 0;
      transform: translateY(20px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }
  .domain-card {
    transition: all 0.3s ease, transform 0.2s ease;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  .domain-card:hover {
    transform: translateY(-5px) !important;
    box-shadow: 0 10px 15px rgba(0,0,0,0.1);
  }
  .domain-card.selected {
    box-shadow: 0 0 0 2px var(--bs-primary), 0 10px 20px rgba(0,0,0,0.2);
  }
  .transition-all {
    transition: all 0.3s ease;
  }
  /* Added contrast improvements */
  .domain-card {
    background: var(--bs-dark) !important;
  }
  .domain-card .card-body {
    color: white !important;
  }
`;
  const LogoutLoading = ({ username }) => (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
         style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1060 }}>
      <div className="bg-white p-5 rounded-3 shadow-lg text-center" 
           style={{ maxWidth: "350px", width: "100%" }}>
        <div className="spinner-border text-danger mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h4 className="text-dark mb-3">Logging out...</h4>
        <p className="text-muted">See you soon, {username}!</p>
        <div className="progress mt-2" style={{ height: "4px" }}>
          <div className="progress-bar bg-danger progress-bar-striped progress-bar-animated" 
               style={{ width: "100%" }}></div>
        </div>
      </div>
    </div>
  );
  {/* Logout Loading Popup */}
{isLoggingOut && (
    <LogoutLoading username={userProfile.name} />
  )}

  // Modal component for login and signup
  
  return (
    <div className="min-vh-100 bg-light text-dark">
      {/* Login Modal */}
      {showLoginModal && (
  <Modal
    title="Login to SkillSync"
    onClose={() => setShowLoginModal(false)}
  >
    <form onSubmit={handleLogin}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
          required
          autoFocus // Add autoFocus to focus the input when modal opens
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Login
      </button>
    </form>
  </Modal>
)}

      {/* Signup Modal */}
      {showSignupModal && (
  <Modal
    title="Create an Account"
    onClose={() => setShowSignupModal(false)}
  >
    <form onSubmit={handleSignup}>
      <div className="mb-3">
        <label htmlFor="newUsername" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="newUsername"
          value={signupUsername}
          onChange={(e) => setSignupUsername(e.target.value)}
          required
          autoFocus // Add autoFocus here too
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={signupEmail}
          onChange={(e) => setSignupEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="newPassword" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="newPassword"
          value={signupPassword}
          onChange={(e) => setSignupPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Sign Up
      </button>
    </form>
  </Modal>
)}
{/* Logout Confirmation Modal */}
{showLogoutModal && (
  <LogoutModal 
    onClose={() => setShowLogoutModal(false)}
    onConfirm={handleLogout}
  />
)}
{/* Loading Popup */}
{isLoggingIn && (
  <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
       style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
    <div className="bg-white p-5 rounded-3 shadow-lg text-center" 
         style={{ maxWidth: "350px", width: "100%" }}>
      <div className="spinner-border text-primary mb-3" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <h4 className="text-dark mb-3">Logging in...</h4>
      <p className="text-muted">Welcome back, {loginUsername}!</p>
      <div className="progress mt-2" style={{ height: "4px" }}>
        <div className="progress-bar progress-bar-striped progress-bar-animated" 
             style={{ width: "100%" }}></div>
      </div>
    </div>
  </div>
)}
{showDomains && (
  <>
    <style>{styles}</style>
    <DomainSelection onComplete={() => {
      // Save selected domains to state or API
      console.log("Selected domains:", selectedDomains);
      // You can add additional logic here
    }} />
  </>
)}

      {/* Navigation */}
      <nav className="container d-flex justify-content-between align-items-center py-3">
  <h1 className="fw-bold text-primary mb-0">
    Skill<span className="text-info">Sync</span>
  </h1>
  <div className="d-none d-md-flex gap-4">
    <a
      href="#features"
      className={`text-decoration-none ${
        activeSection === "features" ? "text-primary fw-bold" : "text-dark"
      }`}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection("features");
      }}
    >
      Features
    </a>
    <a
      href="#how-it-works"
      className={`text-decoration-none ${
        activeSection === "how-it-works" ? "text-primary fw-bold" : "text-dark"
      }`}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection("how-it-works");
      }}
    >
      How It Works
    </a>
    <a
      href="#testimonials"
      className={`text-decoration-none ${
        activeSection === "testimonials" ? "text-primary fw-bold" : "text-dark"
      }`}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection("testimonials");
      }}
    >
      Testimonials
    </a>
  </div>
  <div className="d-flex gap-2 align-items-center">
    {isLoggedIn ? (
      <div className="dropdown">
        <button 
          className="btn p-0 border-0 bg-transparent dropdown-toggle" 
          type="button" 
          id="profileDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img 
            src={userProfile.image} 
            alt="Profile" 
            className="rounded-circle border border-primary"
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
          />
        </button>
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
          <li><span className="dropdown-item-text">Hello, {userProfile.name}</span></li>
          <li><hr className="dropdown-divider" /></li>
          <li>
          <button 
  className="dropdown-item text-danger" 
  onClick={() => setShowLogoutModal(true)}
>
  <i className="bi bi-box-arrow-right me-2"></i>Logout
</button>
          </li>
        </ul>
      </div>
    ) : (
      <>
        <button
          className="btn btn-outline-primary"
          onClick={() => setShowLoginModal(true)}
        >
          Login
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setShowSignupModal(true)}
        >
          Sign Up
        </button>
      </>
    )}
  </div>
</nav>

      {/* Hero Section */}
      <section className="container my-5 d-flex flex-column flex-md-row align-items-center justify-content-between">
        <div className="mb-5 mb-md-0">
          <h2 className="display-4 fw-bold text-dark mb-3">
            Connect, Learn, and Grow Together
          </h2>
          <p className="lead text-muted">
            SkillSync matches you with peers based on your skills and learning
            goals, enabling collaborative growth.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
            <button
              className="btn btn-primary btn-lg d-flex align-items-center gap-2"
              onClick={() =>
                isLoggedIn
                  ? scrollToSection("features")
                  : setShowSignupModal(true)
              }
            >
              Get Started <ChevronRight size={20} />
            </button>
            <button
              className="btn btn-outline-primary btn-lg"
              onClick={() => scrollToSection("how-it-works")}
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h5 className="text-dark mb-4">Top Matches</h5>
          <div className="d-flex flex-column gap-3">
            {/* Match Cards */}
            {allMatches.map((match, index) => (
              <div
                key={index}
                className="d-flex align-items-center bg-light p-3 rounded shadow-sm"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (!isLoggedIn) {
                    setShowLoginModal(true);
                  } else {
                    alert(`Connecting with ${match.title}...`);
                  }
                }}
              >
                <div
                  className={`bg-${match.color} text-white rounded-circle d-flex align-items-center justify-content-center`}
                  style={{ width: "50px", height: "50px", fontSize: "18px" }}
                >
                  {match.initials}
                </div>
                <div className="ms-3 flex-grow-1">
                  <h6 className="mb-0 fw-semibold">{match.title}</h6>
                  <small className="text-muted">{match.subtitle}</small>
                </div>
                <ArrowRight size={18} className="text-primary" />
              </div>
            ))}
          </div>
          <button
            className="btn btn-outline-primary btn-sm mt-4 w-100"
            onClick={() => setShowMoreMatches(!showMoreMatches)}
          >
            {showMoreMatches ? "Show less" : "Show more"}
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5 bg-light text-dark">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Why Choose SkillSync?</h2>
          <p className="text-muted mb-5">
            We combine the best of AI-powered learning and social networking for
            a unique experience.
          </p>
          <div className="row g-4">
            <FeatureCard
              icon={<Users size={32} />}
              title="Smart Matching"
              text="Connect with learners who complement your skills and goals."
              bg="primary"
              onClick={() =>
                isLoggedIn
                  ? alert("Exploring smart matching features...")
                  : setShowSignupModal(true)
              }
            />
            <FeatureCard
              icon={<MessageSquare size={32} />}
              title="Real-Time Collaboration"
              text="Seamlessly collaborate via chat, video, and shared docs."
              bg="info"
              onClick={() =>
                isLoggedIn
                  ? alert("Opening collaboration tools...")
                  : setShowSignupModal(true)
              }
            />
            <FeatureCard
              icon={<Book size={32} />}
              title="AI Assistance"
              text="Get resource recommendations powered by AI."
              bg="warning"
              onClick={() =>
                isLoggedIn
                  ? alert("Accessing AI recommendations...")
                  : setShowSignupModal(true)
              }
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-5 text-dark bg-white">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">How It Works</h2>
          <p className="text-muted mb-5">
            Getting started is quick and simple.
          </p>
          <div className="row g-4">
            {[
              "Create your profile",
              "Get matched with peers",
              "Collaborate in real-time",
              "Learn and achieve goals",
            ].map((step, index) => (
              <div
                key={index}
                className="col-6 col-md-3"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (index === 0 && !isLoggedIn) {
                    setShowSignupModal(true);
                  } else if (!isLoggedIn) {
                    setShowLoginModal(true);
                  } else {
                    alert(`Step ${index + 1}: ${step}`);
                  }
                }}
              >
                <div
                  className="bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{ width: "60px", height: "60px" }}
                >
                  {index + 1}
                </div>
                <h6>{step}</h6>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-5 bg-light text-dark">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">What Users Say</h2>
          <p className="text-muted mb-5">
            Join thousands of satisfied learners building skills together.
          </p>
          <div className="row g-4">
            {[
              {
                name: "Alex Chen",
                role: "Front-end Developer",
                text: "SkillSync helped me find a JavaScript mentor who transformed my coding skills in just 3 months.",
              },
              {
                name: "Sarah Johnson",
                role: "UX Designer",
                text: "I connected with peers who gave me honest feedback on my portfolio and helped me land my dream job.",
              },
              {
                name: "Marcus Torres",
                role: "Data Scientist",
                text: "The AI-recommended resources were exactly what I needed to master machine learning concepts.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="col-md-4">
                <div className="p-4 bg-white rounded shadow h-100">
                  <p className="mb-3">"{testimonial.text}"</p>
                  <div>
                    <h6 className="mb-0">{testimonial.name}</h6>
                    <small className="text-muted">{testimonial.role}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, text, bg, onClick }) {
  return (
    <div className="col-md-4">
      <div
        className={`p-4 bg-${bg} text-white rounded shadow h-100`}
        style={{ cursor: "pointer" }}
        onClick={onClick}
      >
        <div className="mb-3">{icon}</div>
        <h5 className="fw-bold">{title}</h5>
        <p className="mt-2">{text}</p>
      </div>
    </div>
  );
}
