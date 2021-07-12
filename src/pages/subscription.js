import React, { useState } from "react";
import gql from "graphql-tag";
import {  useMutation, useSubscription } from "@apollo/client";
import MessageSection from "../components/MessageSection"
import Loader from "../components/Loading";

const GET_MESSAGES = gql`
  subscription {
    messages {
      id
      content
      user
    }
  }
`;

const POST_MESSAGE = gql`
  mutation($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`;



function Sub() {
  const getMessages = useSubscription(GET_MESSAGES);
	const [createMessage, newMessage] = useMutation(POST_MESSAGE);
	const [content, setContent] = useState("");
	const [name, setName] = useState("");

  if(getMessages.loading) {
		return <Loader/>
	}

  const onSubmit = (e) => {
		e.preventDefault();
		
    createMessage({
      variables: { user: name, content: content  },
    });
  };

  const messages = getMessages.data.messages.map((message) => (
    <div className="col-xs-12 col-md-4 col" key={message.id}>
      <div className="box">
        <MessageSection message={message} />
      </div>
    </div>
  ));



  console.log(getMessages.data.messages)
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
				<input
          className="input"
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit" name="submit">
          Add content
        </button>
      </form>
			<div>
      {messages}
			</div>
      
    </div>
  );
}

export default Sub;