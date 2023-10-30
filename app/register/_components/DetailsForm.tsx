import { ErrorMessage, Spinner } from "@/app/components";
import { detailsSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useRegistrationContext from "../hooks/useRegistrationContext";

type DetailsFormData = z.infer<typeof detailsSchema>;

const DetailsForm = () => {
  const { onBack, onNext, registrationData, dispatch } =
    useRegistrationContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DetailsFormData>({
    resolver: zodResolver(detailsSchema),
    defaultValues: registrationData,
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    // console.log("our data", { data });
    // onNext();
    try {
      setSubmitting(true);
      const firstName = data.firstName?.trim();
      const lastName = data.lastName?.trim();
      const name = `${firstName} ${lastName}`;
      dispatch({
        type: "UPDATE_DETAILS",
        registrationData: {
          ...registrationData,
          ...data,
          name,
        },
      });
      // setRegistrationData((prevRegistrationData) => ({...prevRegistrationData, ...data, name }))
      onNext();
    } catch (error) {
      setError("An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <div>
      {error && (
        <Callout.Root color="red" className="mb-3">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit} className="mt-2">
        {/* <Flex justify={{ initial: 'between', md: 'start'}} direction={{ initial: 'column', md: 'row'}} gap="2" className='mb-4'> */}

        <div>
          <label className="block mb-1" htmlFor="firstName">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="Enter your first name"
            {...register("firstName", {
              required: "First name is required",
              minLength: {
                value: 5,
                message: "First name must be at least 5 characters.",
              },
              maxLength: {
                value: 20,
                message: "First name must be at most 20 characters.",
              },
            })}
            className="w-full border rounded-md p-2"
          />
          <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
        </div>
        <div>
          <label className="block mb-1" htmlFor="lastName">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="Enter your last name"
            {...register("lastName", {
              required: "Last name is required",
              minLength: {
                value: 5,
                message: "Last name must be at least 5 characters.",
              },
              maxLength: {
                value: 20,
                message: "Last name must be at most 20 characters.",
              },
            })}
            className="w-full border rounded-md p-2"
          />
          <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
        </div>
        {/* </Flex> */}

        <Flex className="py-2" gap="2" justify="center">
          <Button
            type="button"
            onClick={onBack}
            className="var(--accent-9) rounded-md"
            // className="bg-var(--accent-9) text-white px-4 py-2 rounded-md"
          >
            Back
            {/* {isSubmitting && <Spinner />} */}
          </Button>
          <Button
            disabled={isSubmitting}
            className="var(--accent-9) rounded-md"
            // className="bg-var(--accent-9) text-white px-4 py-2 rounded-md"
          >
            Next
            {isSubmitting && <Spinner />}
          </Button>
        </Flex>
      </form>
    </div>
  );
};

export default DetailsForm;
