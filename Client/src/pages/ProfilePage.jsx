// ProfilePage.jsx
import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);

  // Keep file separate from preview string (URL/base64/server URL)
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(
    (authUser && authUser.profilePic) || assets.avatar_icon
  );

  // Text fields (safe defaults; hydrate when authUser arrives/changes)
  const [bio, setBio] = useState((authUser && authUser.bio) || "");
  const [name, setName] = useState((authUser && authUser.fullName) || "");

  useEffect(() => {
    setBio((authUser && authUser.bio) || "");
    setName((authUser && authUser.fullName) || "");
    if (!file) {
      setPreview((authUser && authUser.profilePic) || assets.avatar_icon);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  // Revoke blob URLs to avoid leaks
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const onFileChange = (e) => {
    const f = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setFile(f);
    if (f) {
      const url = URL.createObjectURL(f);
      setPreview((old) => {
        if (old && old.startsWith("blob:")) URL.revokeObjectURL(old);
        return url;
      });
    } else {
      setPreview((authUser && authUser.profilePic) || assets.avatar_icon);
    }
  };

  // Optional: resize/compress client-side for faster uploads
  const resizeToDataURL = (file, maxDim = 900, quality = 0.85) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = () => {
        img.onload = () => {
          try {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) return reject(new Error("Canvas not supported"));

            let width = img.naturalWidth || img.width;
            let height = img.naturalHeight || img.height;
            const scale = Math.min(1, maxDim / Math.max(width, height));
            width = Math.round(width * scale);
            height = Math.round(height * scale);

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            const dataUrl = canvas.toDataURL("image/jpeg", quality);
            resolve(dataUrl);
          } catch (err) {
            reject(err);
          }
        };
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);

      const payload = { fullName: name, bio };

      if (file) {
        // Only process & upload when a new file is chosen
        const base64Image = await resizeToDataURL(file, 900, 0.85);
        payload.profilePic = base64Image;
      }

      const res = await updateProfile(payload);
      if (res?.ok) {
        const updateUser = res.user;
        // sync local states so the page shows fresh data
        setName(updateUser.fullName || "");
        setBio(updateUser.bio || "");
        setFile(null);

        // cleanup old blob and show server image
        setPreview((old) => {
          if (old?.startsWith("blob:")) URL.revokeObjectURL(old);
          return updateUser.profilePic || assets.avatar_icon;
        });
      }
      // navigate("/");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center px-6">
      <div className="w-full max-w-3xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 rounded-lg text-left">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6">
          <h3 className="text-xl font-semibold">Profile</h3>

          {/* Avatar uploader */}
          <label
            htmlFor="avatar"
            className="flex items-center gap-4 cursor-pointer w-fit"
          >
            <input
              onChange={onFileChange}
              type="file"
              id="avatar"
              accept=".png,.jpg,.jpeg"
              hidden
            />
            <img
              src={preview}
              alt="Avatar preview"
              className="w-12 h-12 object-cover rounded-full"
            />
            <span className="underline underline-offset-4">
              Upload Profile Picture
            </span>
          </label>

          {/* Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm text-gray-400">
              Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent border border-gray-600 rounded-md px-3 py-2 outline-none focus:border-gray-400"
              placeholder="Your name"
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-2">
            <label htmlFor="bio" className="text-sm text-gray-400">
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="bg-transparent border border-gray-600 rounded-md px-3 py-2 outline-none focus:border-gray-400 resize-y"
              placeholder="Write a short bio..."
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-md border border-gray-600 hover:border-gray-400 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded-md border border-transparent hover:border-gray-600"
            >
              Back To Home Page
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
