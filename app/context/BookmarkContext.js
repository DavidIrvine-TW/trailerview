"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const BookmarkContext = createContext();

export function useBookmarkContext() {
  return useContext(BookmarkContext);
}

export function BookmarkProvider({ children }) {

  const [bookmarkedCards, setBookmarkedCards] = useState([]);
 
  const { data: session } = useSession();
  const userEmail = session?.user.email;


  



  useEffect(() => {
    if (!session) {
      return; // Do nothing if there's no session
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/getuser/${userEmail}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        // console.log(userData)
        // console.log(userData.userData.bookmarks)

        if (userData) {
          const sessionBookmarks = userData.userData.bookmarks || [];
          // console.log(sessionBookmarks)
          localStorage.removeItem("trailerview bookmarks");
          localStorage.setItem(
            "trailerview bookmarks",
            JSON.stringify(sessionBookmarks)
          );
          // Set user session bookmarks as the current state
          setBookmarkedCards(sessionBookmarks);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle the error as needed
      }
    };

    fetchUser(); // Call the function to fetch user data

  }, [session, userEmail]);



  // const signOutAndSaveBookmarks = async (e) => {
   
  //   try {
  //     const response = await fetch('/api/savebookmarks', {
  //       method: 'POST',
  //       headers : {
  //         'Content-type' : 'application/JSON'
  //       },
  //       body: JSON.stringify({
  //         bookmarks: bookmarkedCards,
  //         userEmail: session.user.email,
  //       }),
  //     })
  //     const {message} = await response.json()
  //     console.log(message)

  //   } catch (error) {
  //     console.log("ERROR DURING BLAH BLAH" , error)
  //   }
  //   signOut()
  // }


  

  const addBookmark = (card, userEmail, mediaType) => {
    // Associate the card with the user's email
    const updatedCard = { ...card, user: userEmail, mediaType };
    const updatedBookmarks = [...bookmarkedCards, updatedCard];
    setBookmarkedCards(updatedBookmarks);
    // Save updated bookmarks to localStorage
    localStorage.setItem(
      "trailerview bookmarks",
      JSON.stringify(updatedBookmarks)
    );
  };

  const removeBookmark = (cardId, userEmail) => {
    const updatedBookmarks = bookmarkedCards.filter(
      (card) => card.id !== cardId || card.user !== userEmail
    );
    setBookmarkedCards(updatedBookmarks);
    // Save updated bookmarks to localStorage
    localStorage.setItem(
      "trailerview bookmarks",
      JSON.stringify(updatedBookmarks)
    );
  };

  const contextValue = { bookmarkedCards, addBookmark, removeBookmark };

  return (
    <BookmarkContext.Provider value={contextValue}>
      {children}
    </BookmarkContext.Provider>
  );
}
