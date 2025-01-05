import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import React, { useState, useRef, useEffect } from "react";

export const ChatRoom = () => {
  // Fetch messages logic
  const messagesRef = collection(db, "messages");
  const messagesQuery = query(messagesRef, orderBy("createdAt"));
  const [messages] = useCollectionData(messagesQuery);

  // State for the new message input
  const [newMessage, setNewMessage] = useState("");

  // Ref for the scrollable div
  const bottomRef = useRef<HTMLDivElement>(null);

  // Send message function
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newMessage.trim() === "") return; // Prevent empty messages

    const currentUser = auth.currentUser;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      userId: currentUser?.uid, // User ID
      userName: currentUser?.displayName || "Anonymous", // Display name or fallback
      photoURL: currentUser?.photoURL || "", // Profile picture URL or empty string
    });

    setNewMessage(""); // Clear the input field after sending
  };

  // Scroll to the bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Chat Room Container */}
      <div
        className="mt-20 py-[50px] relative max-h-[300px] overflow-y-scroll"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* render existing messages */}
        {messages?.map((msg, index) => (
          <div key={index} className="flex mb-5 gap-2 items-center">
            <div>
              <p> {msg.userName}</p>
              <img className="size-10" src={msg.photoURL} alt="" />
            </div>
            <div key={index}>
              <p key={index} className="text-black text-1xl">
                {msg.text}
              </p>
              <p key={index} className="text-off-white text-sm">
                {msg.createdAt
                  ? new Date(msg.createdAt.seconds * 1000).toLocaleString() // Convert and format timestamp
                  : "Just now"}{" "}
                {/* Fallback for missing timestamp */}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* form to send new messages */}
      <div>
        <form onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="bg-black text-white px-2" type="submit">
            Send
          </button>
        </form>
      </div>
    </>
  );
};
