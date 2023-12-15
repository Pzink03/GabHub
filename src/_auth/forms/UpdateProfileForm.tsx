import { Button } from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../context/AuthContext";
import { useGetUserById, useUpdateProfile } from "@/lib/react-query/queriesAndMutations";
import Loading from "@/components/Loading";
import ProfilePictureFileUploader from "@/_root/pages/ProfilePictureFileUploader";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ProfileValidationSchema } from "@/lib/validations";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


function UpdateProfileForm() {
    const { id } = useParams();
    const { toast } = useToast()
    const { user, setUser } = useUserContext();
    const navigate = useNavigate();

    const { mutateAsync: updateProfile, isPending: isLoadingUpdate } = useUpdateProfile();
    const { data: currentUser } = useGetUserById(id || '');

  const form = useForm<z.infer<typeof ProfileValidationSchema>>({
    resolver: zodResolver(ProfileValidationSchema),
    defaultValues: {
      file: [],
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio || ""
    }
  })

  if (!currentUser)
  return (
    <div className="flex-center w-full h-full">
      <Loading />
    </div>
  );

  const handleUpdate = async (value: z.infer<typeof ProfileValidationSchema>) => {
    const updateUser = await updateProfile({
      userId: currentUser.$id,
      name: value.name,
      username: value.username,
      bio: value.bio,
      file: value.file,
      email: value.email,
      imageUrl: currentUser.imageUrl,
      imageId: currentUser.imageId,
    })
    if(!updateUser){
      toast({
        title:"Update user failed. Please try again.",
      })
    }

    setUser({
      ...user,
      name: updateUser?.name,
      bio: updateUser?.bio,
      imageUrl: updateUser?.imageUrl,
    })

    return navigate(`/profile/${id}`)
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdate)} className="flex flex-col gap-6 w-full max-w-5xl">
        <FormField
        control={form.control}
        name="file"
        render={({ field }) => (
          <FormItem>
            <FormControl>

            <ProfilePictureFileUploader
              fieldChange={field.onChange}
              mediaUrl={currentUser.imageUrl}
            />
            </FormControl>
            <FormMessage className="shad-form_message" />
          </FormItem>

        )}
        />

        <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Name</FormLabel>
            <FormControl>

            <Input type="text" className="shad-input" {...field} />
            </FormControl>
            <FormMessage className="shad-form_message" />
          </FormItem>

        )}
        />
        <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Username</FormLabel>
            <FormControl>
            <Input type="text" className="shad-input" {...field} />
            </FormControl>
            <FormMessage className="shad-form_message" />
          </FormItem>

        )}
        />

        <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Email</FormLabel>
            <FormControl>

            <Input type="text" className="shad-input" {...field} disabled />
            </FormControl>
            <FormMessage className="shad-form_message" />
          </FormItem>

        )}
        />

        <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Bio</FormLabel>
            <FormControl>

            <Textarea className="shad-textarea custom-scrollbar" {...field} />
            </FormControl>
            <FormMessage className="shad-form_message" />
          </FormItem>

        )}
        />
        <div className="flex gap-4 items-center justify-center">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => navigate(-1)}
            >
            Cancel
          </Button>
            <Button className="shad-button_primary whitespace-nowrap" type="submit" disabled={isLoadingUpdate}>
              Update Profile{isLoadingUpdate && 'Loading...'}
            </Button>
        </div>
      </form>
    </Form>
  );
}

export default UpdateProfileForm;
