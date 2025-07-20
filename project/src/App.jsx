import { useState, useEffect } from 'react'
import { 
  Search, 
  Play, 
  Eye, 
  ThumbsUp, 
  MessageCircle, 
  Share2, 
  Bell, 
  User, 
  Upload, 
  Menu,
  Home,
  TrendingUp,
  Clock,
  BookOpen,
  Star,
  Filter,
  Grid,
  List
} from 'lucide-react'
import VideoUpload from './components/VideoUpload'
import './App.css'

// Sample video data for MIR Tube
const videosData = [
  {
    id: 1,
    title: "One Piece Chapter 1100 Review - Epic Moments!",
    channel: "MangaReviewer",
    views: "2.3M",
    uploadTime: "2 days ago",
    duration: "15:42",
    thumbnail: "https://images.pexels.com/photos/1319854/pexels-photo-1319854.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop",
    likes: "45K",
    comments: "2.1K",
    category: "Review",
    tags: ["One Piece", "Manga", "Review", "Shonen"],
    description: "In-depth review of the latest One Piece chapter with amazing plot developments and character growth."
  },
  {
    id: 2,
    title: "Top 10 Best Manga of 2024 - Must Read!",
    channel: "MangaCentral",
    views: "1.8M",
    uploadTime: "1 week ago",
    duration: "22:15",
    thumbnail: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop",
    likes: "38K",
    comments: "1.5K",
    category: "Top List",
    tags: ["Manga", "2024", "Recommendations", "Best"],
    description: "Discover the most amazing manga series that came out this year. From action to romance, we cover it all!"
  },
  {
    id: 3,
    title: "Attack on Titan Ending Explained",
    channel: "AnimeAnalysis",
    views: "3.1M",
    uploadTime: "3 days ago",
    duration: "18:30",
    thumbnail: "https://images.pexels.com/photos/1319854/pexels-photo-1319854.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop",
    likes: "67K",
    comments: "4.2K",
    category: "Analysis",
    tags: ["Attack on Titan", "Ending", "Analysis", "Shonen"],
    description: "Complete breakdown and analysis of Attack on Titan's controversial ending and what it means for the series."
  },
  {
    id: 4,
    title: "How to Draw Manga Characters - Beginner Tutorial",
    channel: "ArtMaster",
    views: "890K",
    uploadTime: "5 days ago",
    duration: "35:20",
    thumbnail: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop",
    likes: "23K",
    comments: "890",
    category: "Tutorial",
    tags: ["Drawing", "Tutorial", "Art", "Manga"],
    description: "Learn the basics of drawing manga characters with step-by-step instructions for beginners."
  },
  {
    id: 5,
    title: "Demon Slayer vs Jujutsu Kaisen - Which is Better?",
    channel: "MangaDebate",
    views: "1.2M",
    uploadTime: "1 day ago",
    duration: "12:45",
    thumbnail: "https://images.pexels.com/photos/1319854/pexels-photo-1319854.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop",
    likes: "34K",
    comments: "2.8K",
    category: "Comparison",
    tags: ["Demon Slayer", "Jujutsu Kaisen", "Comparison", "Shonen"],
    description: "Epic comparison between two of the most popular modern manga series. Which one comes out on top?"
  },
  {
    id: 6,
    title: "My Hero Academia Season 7 Predictions",
    channel: "HeroTheories",
    views: "756K",
    uploadTime: "4 days ago",
    duration: "20:10",
    thumbnail: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop",
    likes: "19K",
    comments: "1.1K",
    category: "Theory",
    tags: ["My Hero Academia", "Predictions", "Theory", "Shonen"],
    description: "What to expect in the upcoming season of My Hero Academia based on manga developments."
  }
]

const categories = ["All", "Review", "Tutorial", "Analysis", "Top List", "Theory", "Comparison", "News"]
const sortOptions = ["Relevance", "Upload Date", "View Count", "Rating"]

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('Relevance')
  const [viewMode, setViewMode] = useState('grid')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [videos, setVideos] = useState(videosData)

  const handleVideoUpload = (newVideo) => {
    setVideos(prev => [newVideo, ...prev])
  }

  const filteredVideos = videos
    .filter(video => 
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || video.category === selectedCategory)
    )
    .sort((a, b) => {
      if (sortBy === 'View Count') return parseFloat(b.views) - parseFloat(a.views)
      if (sortBy === 'Upload Date') return new Date(b.uploadTime) - new Date(a.uploadTime)
      if (sortBy === 'Rating') return parseFloat(b.likes) - parseFloat(a.likes)
      return 0
    })

  return (
    <div className="mir-tube">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <button 
            className="menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={24} />
          </button>
          <div className="logo">
            <BookOpen className="logo-icon" />
            <span className="logo-text">MIR Tube</span>
          </div>
        </div>

        <div className="header-center">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search manga videos, reviews, tutorials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">
              <Search size={20} />
            </button>
          </div>
        </div>

        <div className="header-right">
          <button 
            className="icon-btn upload-btn-header"
            onClick={() => setUploadModalOpen(true)}
            title="Video Yuklash"
          >
            <Upload size={20} />
          </button>
          <button className="icon-btn">
            <Bell size={20} />
          </button>
          <button className="profile-btn">
            <User size={20} />
          </button>
        </div>
      </header>

      <div className="main-container">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <nav className="sidebar-nav">
            <div className="nav-section">
              <a href="#" className="nav-item active">
                <Home size={20} />
                <span>Home</span>
              </a>
              <a href="#" className="nav-item">
                <TrendingUp size={20} />
                <span>Trending</span>
              </a>
              <a href="#" className="nav-item">
                <Clock size={20} />
                <span>Watch Later</span>
              </a>
            </div>

            <div className="nav-section">
              <h3 className="section-title">Categories</h3>
              <a href="#" className="nav-item">
                <Star size={20} />
                <span>Reviews</span>
              </a>
              <a href="#" className="nav-item">
                <BookOpen size={20} />
                <span>Tutorials</span>
              </a>
              <a href="#" className="nav-item">
                <MessageCircle size={20} />
                <span>Discussions</span>
              </a>
            </div>

            <div className="nav-section">
              <h3 className="section-title">Popular Channels</h3>
              <div className="channel-item">
                <div className="channel-avatar">MR</div>
                <span>MangaReviewer</span>
              </div>
              <div className="channel-item">
                <div className="channel-avatar">MC</div>
                <span>MangaCentral</span>
              </div>
              <div className="channel-item">
                <div className="channel-avatar">AA</div>
                <span>AnimeAnalysis</span>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Filters */}
          <div className="filters">
            <div className="filter-left">
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="filter-right">
              <div className="view-toggle">
                <button 
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={18} />
                </button>
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Videos Grid */}
          <div className={`videos-container ${viewMode}`}>
            {filteredVideos.map(video => (
              <div key={video.id} className="video-card">
                <div className="video-thumbnail">
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="video-overlay">
                    <button className="play-btn">
                      <Play size={24} fill="white" />
                    </button>
                  </div>
                  <span className="video-duration">{video.duration}</span>
                </div>
                
                <div className="video-info">
                  <h3 className="video-title">{video.title}</h3>
                  <div className="video-meta">
                    <span className="channel-name">{video.channel}</span>
                    <div className="video-stats">
                      <span className="views">
                        <Eye size={14} />
                        {video.views} views
                      </span>
                      <span className="upload-time">{video.uploadTime}</span>
                    </div>
                  </div>
                  
                  <div className="video-tags">
                    {video.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  
                  <div className="video-actions">
                    <button className="action-btn">
                      <ThumbsUp size={16} />
                      <span>{video.likes}</span>
                    </button>
                    <button className="action-btn">
                      <MessageCircle size={16} />
                      <span>{video.comments}</span>
                    </button>
                    <button className="action-btn">
                      <Share2 size={16} />
                      <span>Share</span>
                    </button>
                  </div>
                  
                  {viewMode === 'list' && (
                    <p className="video-description">{video.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      
      <VideoUpload 
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUpload={handleVideoUpload}
      />
    </div>
  )
}

export default App