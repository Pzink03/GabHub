import React, { useState } from "react";
import FileUploader from "../../components/FileUploader";
import { Button } from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../context/AuthContext";
import { useGetUserById, useUpdateProfile } from "@/lib/react-query/queriesAndMutations";
import Loading from "@/components/Loading";
import ProfilePictureFileUploader from "@/_root/pages/ProfilePictureFileUploader";




export type IUpdateProfile = {
    name: string;
    file: File[];
    username: string;
    bio: string;
  };

function UpdateProfileForm() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');

    const [selectedFile, setSelectedFile] = useState<File[]>([]);
    const { mutateAsync: updateProfile, isPending: isLoadingUpdate } = useUpdateProfile();
    const { data: currentUser } = useGetUserById(id || '');
    const { user, setUser } = useUserContext();
    const values: IUpdateProfile = {
    name: name,
    file: selectedFile,
    username: username,
    bio: bio
  };



  const navigate = useNavigate();

  if (!currentUser)
  return (
    <div className="flex-center w-full h-full">
      <Loading />
    </div>
  );


  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();


      const updatedProfile = await updateProfile({
        ...values,
        userId: currentUser.$id,
        name: name,
        username: username,
        email: email,
        bio: bio,
        file: selectedFile,

        imageId: currentUser?.imageId,
        imageUrl: currentUser?.imageUrl
      })


    // Validate form data, and prevent form submission if needed
    if (!updatedProfile) {
      alert("Please provide a caption and select an image.");
      return;
    }

    // const formData = new FormData();
    // formData.append("file", selectedFile);
    // formData.append("caption", caption);
    // formData.append("location", location);
    // formData.append("tags", tags);
    // formData.append("userId", user.id);



        setUser({
            ...user,
            name: updatedProfile?.name,
            bio: updatedProfile?.bio,
            imageUrl: updatedProfile?.imageUrl

        })
        // Reset form fields and navigate to a different page (e.g., home)
        navigate(`/profile/${id}`); // Change the destination route accordingly
        // Handle the error (e.g., display an error message to the user)
  }

  return (
      <form onSubmit={onSubmit} className="flex flex-col gap-9 w-full max-w-5xl">
        <ProfilePictureFileUploader
          fieldChange={(file) => setSelectedFile(file)}
          mediaUrl={selectedFile.length > 0 ? URL.createObjectURL(selectedFile[0]) : currentUser?.imageUrl}
        />
      <label className="shad-form_label" htmlFor="bio">
        Name
      </label>
      <input
        className="shad-input"
        id='name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label className="shad-form_label" htmlFor="name">
        Bio
      </label>
      <textarea
        className="shad-textarea shad-input custom-scrollbar full-width-textarea"
        id="bio"
        value={bio}
        placeholder="Write a bio"
        onChange={(e) => setBio(e.target.value)}
      />
      <label className="shad-form_label" htmlFor="file">

      </label>
      <label className="shad-form_label" htmlFor="username">
        Username
      </label>
      <input
        className="shad-input"
        type="text"
        id="username"

        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label className="shad-form_label" htmlFor="email">
        Email
      </label>
      <textarea
        className="shad-input"
        id="email"

        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="flex gap-4 items-center justify-center">
        <Button type="button" className="shad-button_dark_4">
          Cancel
        </Button>
        <Button className="shad-button_primary whitespace-nowrap" type="submit" disabled={isLoadingUpdate}>
          Submit{isLoadingUpdate && 'Loading...'}
        </Button>
      </div>
    </form>
  );
}

export default UpdateProfileForm;
