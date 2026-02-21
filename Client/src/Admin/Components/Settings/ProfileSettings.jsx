import React, { useState } from 'react';

import { Input } from "../../../Components/ui/Input";
import { CountrySelect } from "../../../Components/CountrySelect";
import Button from '../../../Components/ui/Button';
import { MdDriveFolderUpload } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";

export const ProfileSettings = ({ formData = {}, onChange = () => {}, onSubmit = () => {} }) => {
  

  const [previewUrl, setPreviewUrl] = useState(formData.profilePicturePreview || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);

      // formData-তে File object পাঠানো (submit-এ upload করার জন্য)
      onChange({
        target: {
          name: 'profilePicture',
          value: file, // actual File object
        },
      });

      // Optional: preview URL-ও রাখতে চাইলে (যদি backend থেকে URL আসে)
      onChange({
        target: {
          name: 'profilePicturePreview',
          value: imageUrl,
        },
      });
    }
  };

  return (
    <form className="space-y-10" onSubmit={onSubmit}>
      {/* Profile Picture Upload Section */}
      <div className="flex flex-col items-center sm:items-start gap-4">
      <h1>Personal information</h1>
        <div className="flex items-center gap-6">
          {/* Avatar Preview */}
          <div className="shrink-0">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile preview"
                className="h-20 w-20 object-cover rounded-md  shadow-sm"
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 border-2 border-gray-300">
                No Photo
              </div>
            )}
          </div>

          {/* Upload Area */}
          <label className="cursor-pointer">
            <span className="sr-only">Choose profile photo</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <div className="btn">
              <MdDriveFolderUpload size={18}/>
              Upload Photo
            </div>
          </label>
        </div>
      </div>

      {/* Rest of the form */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* First name */}
        <Input
          label="First name"
          id="firstName"
          placeholder="First name..."
          value={formData.firstName || ''}
          onChange={(e) => onChange(e)}
        />
        {/* last name */}
        <Input
          label="Last name"
          id="lastName"
          placeholder="Last name..."
          value={formData.lastName || ''}
          onChange={(e) => onChange(e)}
        />
        {/* email */}
        <Input
          label="Email address"
          id="email"
          type="email"
          placeholder="example@domain.com"
          value={formData.email || ''}
          onChange={(e) => onChange(e)}
        />
        {/* phone num */}
        <Input
          label="Phone number"
          id="phone"
          type="tel"
          value={formData.phone || ''}
          onChange={(e) => onChange(e)}
        />
        
          {/* Address */}
         <Input
          label="Adress"
          id="adress"
          className=""
          value={formData.city || ''}
          onChange={(e) => onChange(e)}
          placeholder="your adress..."
        />

        {/* City */}
        <Input
          label="City"
          id="city"
          value={formData.city || ''}
          onChange={(e) => onChange(e)}
          placeholder="City name..."
        />
        {/* Adress */}
        <CountrySelect
          label="Country"
          id="country"
          value={formData.country || "BD"}
          onChange={(val) => onChange({ target: { name: 'country', value: val } })}
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button">Cancel</Button>
        <Button icon={<FaRegSave/>} type="submit">Save Changes</Button>
      </div>
    </form>
  );
};