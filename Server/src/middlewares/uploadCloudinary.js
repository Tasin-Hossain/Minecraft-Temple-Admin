// middleware/uploadCloudinary.js
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js'; 

// Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    let folder = 'users';
    let allowed_formats = ['jpg', 'jpeg', 'png', 'gif'];

    if (file.fieldname === 'avatar') {
      folder = 'users/avatars';
    } else if (file.fieldname === 'banner') {
      folder = 'users/banners';
    } else if (file.fieldname === 'gallery') {
      folder = 'users/gallery'; // For multiple images
    }

    return {
      folder: folder,
      allowed_formats,
      public_id: `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
      resource_type: 'image',
    };
  },
});

// File filter 
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

// Multer instance —
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  // limits: { fileSize: 10 * 1024 * 1024 } // max 10MB (banner-এর জন্য)

});


export const uploadProfileMedia = upload.fields([
  { name: 'avatar', maxCount: 1 },      
  { name: 'banner', maxCount: 1 },   
  { name: 'gallery', maxCount: 10 },    
]);

export const validateFileSize = (req, res, next) => {
  const files = req.files || {};

  // Avatar
  if (files.avatar?.[0]?.size > 5 * 1024 * 1024) {
    return res.status(400).json({ message: 'Avatar file size must be less than 5MB' });
  }

  // Banner
  if (files.banner?.[0]?.size > 8 * 1024 * 1024) {
    return res.status(400).json({ message: 'Banner file size must be less than 8MB' });
  }

  // Gallery (একটা exceed হলেই exit)
  if (files.gallery) {
    const oversized = files.gallery.find(file => file.size > 8 * 1024 * 1024);
    if (oversized) {
      return res.status(400).json({ message: 'Each gallery image must be less than 8MB' });
    }
  }

  next();
};