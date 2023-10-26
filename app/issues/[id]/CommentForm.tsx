"use client";

import { ErrorMessage, Spinner } from "@/app/components";
import { commentIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue, User } from "@prisma/client";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Box,
  Button,
  Callout,
  Flex,
  Popover,
  Text,
} from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type CommentFormData = z.infer<typeof commentIssueSchema>;

export interface CommentDetails {
  issue: Issue;
  user: User;
}

interface Props {
  details: CommentDetails;
}
const CommentForm = ({ details }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>({ resolver: zodResolver(commentIssueSchema) });
  // } = useForm();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const router = useRouter();
  const issueId = details.issue.id;
  const userId = details.user ? details.user.id : null;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (issueId && userId) await axios.post(`/api/issues/${issueId}/comments`, { ...data, userId });
      reset();
      setIsPopoverOpen(false);
      router.refresh();
    } catch (error) {
      setError("An unexpected error occurred.");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  });

  const handlePopoverOpen = () => {
    setIsPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
  };

  return (
    <div>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        { userId && <input type="hidden" {...register("userId")} value={userId} />}
        <Popover.Root open={isPopoverOpen} onOpenChange={handlePopoverOpen}>
          <Popover.Trigger>
            <Button variant="soft">
              <ChatBubbleIcon width="16" height="16" />
              Comment
            </Button>
          </Popover.Trigger>
          <Popover.Content style={{ width: "90vw" }}>
            <Flex gap="3">
              <Avatar
                size="2"
                src={details.user?.image || ''}
                fallback="A"
                radius="full"
              />
              <Box grow="1">
                {/* <TextArea
                  placeholder="Write a comment…"
                  style={{ height: 100 }}
                  {...register("text")}
                /> */}
                <Controller
                  name="text"
                  control={control}
                  render={({ field }) => (
                    <SimpleMDE
                      placeholder="Write yout comment..."
                      {...field}
                      options={{
                        autofocus: true,
                        spellChecker: false,
                        renderingConfig: {
                          codeSyntaxHighlighting: true,
                        },
                        toolbar: [
                          "bold",
                          "italic",
                          "heading",
                          "strikethrough",
                          "|",
                          "code",
                          "quote",
                          "|",
                          "unordered-list",
                          "ordered-list",
                          "|",
                          "link",
                          "image",
                          "|",
                          "preview",
                          "side-by-side",
                          "fullscreen",
                        ],
                      }}
                    />
                  )}
                />
                <ErrorMessage>{errors.text?.message}</ErrorMessage>
                <Flex gap="3" mt="3" justify="between">
                  {/* <Flex align="center" gap="2" asChild>
                    <Text as="label" size="2">
                      <Checkbox />
                      <Text>Send to group</Text>
                    </Text>
                  </Flex> */}
                  <Flex align="center" gap="3">
                    <Button size="1" disabled={isSubmitting} onClick={onSubmit}>
                      Submit Comment
                      {isSubmitting && <Spinner />}
                    </Button>
                    <Text
                      size="1"
                      className="cursor-pointer"
                      onClick={handlePopoverClose}
                    >
                      Close
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          </Popover.Content>
        </Popover.Root>
      </form>
    </div>
  );
};

export default CommentForm;
