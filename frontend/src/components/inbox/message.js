import React, { useEffect } from "react";
import { useConversation } from "../../zustand/useConversation";
import { Spinner } from "@nextui-org/react";
import axios from "axios";

function MessageComponent() {
  const [isLoading, setIsLoading] = React.useState(false);

  const messages = useConversation((state) => state.messages);

  const loggedInUser = JSON.parse(localStorage.getItem("authUser"));

  const clickedUser = useConversation((state) => state.clickedUser);

  useEffect(() => {
    if (clickedUser) {
      const getMessage = async () => {
        try {
          setIsLoading(true);
          const res = await axios.get(
            `http://localhost:5000/api/messages/${clickedUser._id}`,
            {
              withCredentials: true,
            },
          );
          useConversation.setState({ messages: res.data.messages });
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.log(error.response.data.error, "error");
        }
      };
      getMessage();
    }
  }, [clickedUser]);

  return (
    <>
      {!isLoading ? (
        messages ? (
          messages?.map((message, index) => {
            console.log(messages.senderId, "messages");

            return (
              <>
                {message.senderId === loggedInUser.userId ? (
                  <div className="my-4 flex flex-row-reverse items-start justify-start gap-2.5">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={loggedInUser.profilePic}
                      alt="J"
                    />
                    <div className="leading-1.5  flex w-full max-w-[320px] flex-col rounded-s-xl rounded-ee-xl  border-gray-200 bg-gray-100 p-4 dark:bg-gray-700">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {loggedInUser.username}
                        </span>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          11:46
                        </span>
                      </div>
                      <p className="py-2.5 text-sm font-normal text-gray-900 dark:text-white">
                        {message.message}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="my-4 flex items-start justify-start gap-2.5">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={clickedUser.profilePic}
                      alt="J"
                    />
                    <div className="leading-1.5 flex w-full max-w-[320px] flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-4 dark:bg-gray-700">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {clickedUser.username}
                        </span>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          11:46
                        </span>
                      </div>
                      <p className="py-2.5 text-sm font-normal text-gray-900 dark:text-white">
                        {message.message}
                      </p>
                    </div>
                  </div>
                )}
              </>
            );
          })
        ) : (
          <div className="flex h-full items-center justify-center">
            <span>no messages yet</span>
          </div>
        )
      ) : (
        <div className="flex h-full items-center justify-center">
          <Spinner size="sm" color="primary" />
        </div>
      )}
    </>
  );
}

export default MessageComponent;
