import React, { useState, useMemo } from "react";
import FileUploader from "../../components/FileUploader";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { Models } from "appwrite";
import { useUserContext } from "../../context/AuthContext";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutations";
import Loading from "@/components/Loading";
import { checkCaption } from "./validators";



export type INewPost = {
    caption: string;
    file: File[];
    location?: string;
    tags?: string;
  };

type PostFormProps = {
    post?: Models.Document;
    action: 'Create' | 'Update'
  };

function PostForm({ post, action }: PostFormProps) {
    const [isAfterFirstSubmit, setIsAfterFirstSubmit] = useState<boolean>(false);
    const [caption, setCaption] = useState(post?.caption);
    const [location, setLocation] = useState(post?.location);
    const [tags, setTags] = useState(post?.tags.join(', '));
    const [selectedFile, setSelectedFile] = useState<File[]>([]);
    const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();
    const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost();
    const { user } = useUserContext();
    const values: INewPost = {
    caption: caption,
    file: selectedFile,
    location: location,
    tags: tags
  };
  const captionErrors: string[] = useMemo(() => {
    return isAfterFirstSubmit ? checkCaption(caption) : [];
  }, [isAfterFirstSubmit, caption]);



  const navigate = useNavigate();



  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if(post && action === 'Update') {
      const updatedPost = await updatePost({
        ...values,
        postId: post.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl
      })

      if(!updatedPost) throw Error

      return navigate(`/posts/${post.$id}`)
    }

    // Validate form data, and prevent form submission if needed
    // if (!caption || !selectedFile) {
    //   alert("Please provide a caption and select an image.");
    //   return;
    // }

    // const formData = new FormData();
    // formData.append("file", selectedFile);
    // formData.append("caption", caption);
    // formData.append("location", location);
    // formData.append("tags", tags);
    // formData.append("userId", user.id);



        const newPost = await createPost({
          ...values,
          userId: user.id,
        });
        console.log(user.id)
        console.log(values)

        // Check if newPost is falsy (not null or undefined)
        if (!newPost) {
          throw new Error("Failed to create a new post.");
        }

        setIsAfterFirstSubmit(true);
        // const captionResults = checkCaption(caption)

        // Reset form fields and navigate to a different page (e.g., home)
        navigate("/"); // Change the destination route accordingly
        // Handle the error (e.g., display an error message to the user)
      }

      if (isLoadingCreate)
      return (
        <div className="flex-center w-full h-full">
          <Loading />
        </div>
      );

      if (isLoadingUpdate)
      return (
        <div className="flex-center w-full h-full">
          <Loading />
        </div>
      );
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-9 w-full max-w-5xl">
      <label className="shad-form_label" htmlFor="caption">
        Caption
      </label>
      <textarea
        className={`shad-textarea shad-input custom-scrollbar full-width-textarea ${captionErrors.length > 0 ? "error" : ""}`}
        id="caption"
        value={caption}
        placeholder="Caption your photo"
        onChange={(e) => setCaption(e.target.value)}
      />
      <label className="shad-form_label" htmlFor="file">
        Add Photos
      </label>
      <FileUploader
        fieldChange={(file) => setSelectedFile(file)}
        mediaUrl={selectedFile.length > 0 ? URL.createObjectURL(selectedFile[0]) : post?.imageUrl}
      />
      <label className="shad-form_label" htmlFor="location">
        Add Location
      </label>
      <input
        className="shad-input"
        type="text"
        id="location"
        placeholder="Add the location of your photo"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <label className="shad-form_label" htmlFor="tags">
        Add Tags (separated by comma ", ")
      </label>
      <input
        className="shad-input"
        type="text"
        id="tags"
        placeholder="Art, Music, Education"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <div className="flex gap-4 items-center justify-center p-4">
        <Button type="button" variant='dark' className="" >
          Cancel
        </Button>
        <Button variant='ghost' className="bg-primary-500 whitespace-nowrap" type="submit" disabled={isLoadingCreate || isLoadingUpdate}>
          {isLoadingCreate || isLoadingUpdate && 'Loading...'}
          {action} Post
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
