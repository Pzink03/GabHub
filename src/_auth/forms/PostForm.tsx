import React, { useState } from "react";
import FileUploader from "../../components/FileUploader";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { Models } from "appwrite";
import { useUserContext } from "../../context/AuthContext";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutations";
import { updatePost } from "@/lib/appwrite/api";



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
    const [caption, setCaption] = useState(post?.caption);
    const [location, setLocation] = useState(post?.location);
    const [tags, setTags] = useState(post?.tags);
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
    if (!caption || !selectedFile) {
      alert("Please provide a caption and select an image.");
      return;
    }

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

        // Reset form fields and navigate to a different page (e.g., home)
        navigate("/"); // Change the destination route accordingly
        // Handle the error (e.g., display an error message to the user)
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-9 w-full max-w-5xl">
      <label className="shad-form_label" htmlFor="caption">
        Caption
      </label>
      <textarea
        className="shad-textarea shad-input custom-scrollbar full-width-textarea"
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
      <div className="flex gap-4 items-center justify-center">
        <Button type="button" className="shad-button_dark_4">
          Cancel
        </Button>
        <Button className="shad-button_primary whitespace-nowrap" type="submit" disabled={isLoadingCreate || isLoadingUpdate}>
          {isLoadingCreate || isLoadingUpdate && 'Loading...'}
          {action} Post
        </Button>
      </div>
    </form>
  );
}

export default PostForm;


// import React, { useState, useMemo } from "react";
// import { checkEmail, checkName, checkPassword, checkUsername } from "./validators";
// import { Button } from "../../components/Button";
// import Loading from "../../components/Loading";
// import { Link, useNavigate } from "react-router-dom";
// import { useSignInAccount } from "../../lib/react-query/queriesAndMutations";
// import { useUserContext } from "../../context/AuthContext";
// import FileUploader from "../../components/FileUploader";

// function PostForm() {
//     const [caption, setCaption] = useState<string>("");
//     const [username, setUsername] = useState<string>("");

//   const emailErrors: string[] = useMemo(() => {
//     return isAfterFirstSubmit ? checkEmail(email) : [];
//   }, [isAfterFirstSubmit, email]);

//   const passwordErrors: string[] = useMemo(() => {
//     return isAfterFirstSubmit ? checkPassword(password) : [];
//   }, [isAfterFirstSubmit, password]);


// async function onSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     const userValues = {
//         email: email,
//         password: password
//     }

//     const session = await signInAccount({
//         email: userValues.email,
//         password: userValues.password



//     })

//     if(!session) return



//     setIsAfterFirstSubmit(true);
//     const nameResults = checkName(name)
//     const usernameResults = checkUsername(username)
//     const emailResults = checkEmail(email);
//     const passwordResults = checkPassword(password);

//     if (emailResults.length === 0 && passwordResults.length === 0 && nameResults.length === 0 && usernameResults.length === 0 ) {
//       alert("Success");

//     }

//     const isLoggedIn = await checkAuthUser()

//     if(isLoggedIn) {
//         setName('')
//         setEmail('')
//         setPassword('')
//         setUsername('')

//         navigate('/')
//     } else {
//         console.log("youre a chode")
//     }

//   }

//   return (
//     <form onSubmit={onSubmit} className="flex flex-col gap-9 w-full max-w-5xl">
//         <label className="shad-form_label" htmlFor="caption">
//             Caption
//         </label>
//         <textarea
//           className="shad-textarea shad-input custom-scrollbar full-width-textarea"
//           id="email"
//           value={caption}
//           placeholder="Caption your photo"
//           onChange={(e) => setCaption(e.target.value)}
//         />
//         <label className="shad-form_label" htmlFor="file">
//             Add Photos
//         </label>
//        <FileUploader
//         fieldChange={field.onChange}
//         mediaUrl={post?.imageUrl}

//        />
//        <label className="shad-form_label" htmlFor="location">
//             Add Location
//         </label>
//         <input
//           className="shad-input"
//           type="text"
//           id="location"
//           placeholder="Add the location of your photo"
//           value={caption}
//           onChange={(e) => setCaption(e.target.value)}
//         />
//         <label className="shad-form_label" htmlFor="location">
//             Add Tags (separated by comma " , ")
//         </label>
//         <input
//           className="shad-input"
//           type="text"
//           id="tags"
//           placeholder="Art, Music, Education"
//           value={caption}
//           onChange={(e) => setCaption(e.target.value)}
//         />
//         <div className="flex gap-4 items-center justify-center">
//             <Button type="button" className="shad-button_dark_4">Cancel</Button>
//             <Button className="shad-button_primary whitespace-nowrap">Submit</Button>
//         </div>
//         {emailErrors.length > 0 && (
//           <div className="msg">{emailErrors.join(", ")}</div>
//         )}

//       <div className={`flex flex-col gap-2 ${passwordErrors.length > 0 ? "error" : ""}`}>
//         <label className="font-bold" htmlFor="password">
//           Password
//         </label>
//         <input
//           className="border-black rounded p-1 text-black"
//           type="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         {passwordErrors.length > 0 && (
//           <div className="msg">{passwordErrors.join(", ")}</div>
//         )}
//       </div>
//       <Button className="bg-purple-600">
//         {isUserLoading ? (
//             <div className="flex-center gap-2">
//                <Loading /> Loading...
//             </div>
//         ): "Log In"}
//         </Button>
//         <p className=" text-small-regular text-light-2 text-center mt-2">
//             Don't have an account?
//             <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1">Sign up</Link>

//         </p>
//     </form>
//   );
// }

// export default PostForm;
