'use client';

import { CldUploadWidget } from 'next-cloudinary';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  return (
    <div>
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={(result: any) => {
          onChange(result.info.secure_url);
        }}
      >
        {({ open }) => (
          <div>
            {value && (
              <div className="mb-4">
                <img
                  src={value}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-full border-4 border-gray-200"
                />
              </div>
            )}
            <button
              type="button"
              onClick={() => open()}
              className="btn btn-secondary"
            >
              {value ? 'Change Image' : 'Upload Image'}
            </button>
          </div>
        )}
      </CldUploadWidget>
    </div>
  );
}
