import { useState } from 'react'
import { Upload, X, Play, Image, FileText, Tag, Globe } from 'lucide-react'

const VideoUpload = ({ isOpen, onClose, onUpload }) => {
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    category: 'Review',
    tags: '',
    thumbnail: null,
    video: null,
    visibility: 'public'
  })
  
  const [dragActive, setDragActive] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const categories = [
    'Review', 'Tutorial', 'Analysis', 'Top List', 
    'Theory', 'Comparison', 'News', 'Fan Art', 
    'Discussion', 'Reaction'
  ]

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith('video/')) {
        setUploadData(prev => ({ ...prev, video: file }))
      }
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('video/')) {
      setUploadData(prev => ({ ...prev, video: file }))
    }
  }

  const handleThumbnailSelect = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setUploadData(prev => ({ ...prev, thumbnail: file }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!uploadData.video || !uploadData.title) return

    setIsUploading(true)
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i)
      await new Promise(resolve => setTimeout(resolve, 200))
    }

    // Create new video object
    const newVideo = {
      id: Date.now(),
      title: uploadData.title,
      channel: "Sizning Kanalingiz",
      views: "0",
      uploadTime: "Hozir",
      duration: "0:00",
      thumbnail: uploadData.thumbnail ? URL.createObjectURL(uploadData.thumbnail) : "https://images.pexels.com/photos/1319854/pexels-photo-1319854.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop",
      likes: "0",
      comments: "0",
      category: uploadData.category,
      tags: uploadData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      description: uploadData.description,
      videoFile: uploadData.video
    }

    onUpload(newVideo)
    setIsUploading(false)
    setUploadProgress(0)
    setUploadData({
      title: '',
      description: '',
      category: 'Review',
      tags: '',
      thumbnail: null,
      video: null,
      visibility: 'public'
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="upload-modal-overlay">
      <div className="upload-modal">
        <div className="upload-header">
          <h2>Video Yuklash</h2>
          <button onClick={onClose} className="close-btn">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="upload-form">
          {/* Video Upload Area */}
          <div className="upload-section">
            <h3>Video Fayl</h3>
            <div 
              className={`upload-area ${dragActive ? 'drag-active' : ''} ${uploadData.video ? 'has-file' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {uploadData.video ? (
                <div className="file-info">
                  <Play size={48} />
                  <p>{uploadData.video.name}</p>
                  <span>{(uploadData.video.size / (1024 * 1024)).toFixed(2)} MB</span>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <Upload size={48} />
                  <p>Video faylni bu yerga sudrab olib keling yoki tanlang</p>
                  <span>MP4, MOV, AVI formatlarini qo'llab-quvvatlaydi</span>
                </div>
              )}
              <input
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="file-input"
              />
            </div>
          </div>

          {/* Video Details */}
          <div className="upload-section">
            <h3>Video Ma'lumotlari</h3>
            
            <div className="form-group">
              <label>Sarlavha *</label>
              <input
                type="text"
                value={uploadData.title}
                onChange={(e) => setUploadData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Masalan: One Piece 1100-bob sharhi - Ajoyib lahzalar!"
                required
              />
            </div>

            <div className="form-group">
              <label>Tavsif</label>
              <textarea
                value={uploadData.description}
                onChange={(e) => setUploadData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Video haqida batafsil ma'lumot bering..."
                rows={4}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Kategoriya</label>
                <select
                  value={uploadData.category}
                  onChange={(e) => setUploadData(prev => ({ ...prev, category: e.target.value }))}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Ko'rinish</label>
                <select
                  value={uploadData.visibility}
                  onChange={(e) => setUploadData(prev => ({ ...prev, visibility: e.target.value }))}
                >
                  <option value="public">Ommaviy</option>
                  <option value="unlisted">Havola orqali</option>
                  <option value="private">Shaxsiy</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Teglar</label>
              <input
                type="text"
                value={uploadData.tags}
                onChange={(e) => setUploadData(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="One Piece, Manga, Sharh, Shonen (vergul bilan ajrating)"
              />
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div className="upload-section">
            <h3>Thumbnail</h3>
            <div className="thumbnail-upload">
              {uploadData.thumbnail ? (
                <div className="thumbnail-preview">
                  <img src={URL.createObjectURL(uploadData.thumbnail)} alt="Thumbnail" />
                  <button 
                    type="button" 
                    onClick={() => setUploadData(prev => ({ ...prev, thumbnail: null }))}
                    className="remove-thumbnail"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="thumbnail-placeholder">
                  <Image size={32} />
                  <span>Thumbnail tanlang</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailSelect}
                    hidden
                  />
                </label>
              )}
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="upload-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <span>{uploadProgress}% yuklandi</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="upload-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Bekor qilish
            </button>
            <button 
              type="submit" 
              className="upload-btn"
              disabled={!uploadData.video || !uploadData.title || isUploading}
            >
              {isUploading ? 'Yuklanmoqda...' : 'Video Yuklash'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default VideoUpload