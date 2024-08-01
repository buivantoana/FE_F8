import React, { useState } from "react";
import NoteView from "./NoteView";
import { useQuery, useQueryClient } from "react-query";
import { useLocalStorage } from "@/hooks/useStorage";
import { deleteNote, getNoteLessonAndCourses, updateNote } from "@/service/note";

type Props = {
  toggleDrawerNote: any;
  openNote: any;
  lesson_id: any;
  courses_id: any;
};

const NoteController = ({
  toggleDrawerNote,
  openNote,
  lesson_id,
  courses_id,
}: Props) => {
  const [user, setUser] = useLocalStorage("user", {});
  const [edit, setEdit]:any = useState(null);
  
  const [content, setContent] = React.useState("");
  const queryClient = useQueryClient();
  const { data } = useQuery(["note", lesson_id, openNote], {
    queryFn: () => {
      if (openNote) {
        return getNoteLessonAndCourses({
          courses_id,
          lesson_id,
          user_id: user.data[0]._id,
        });
      }
    },
  });

  const handleEditorChange = (e: any, editor: any) => {
    setContent(editor.getContent());
  };
  const handleDeleteNote = async (id: string) => {
    try {
     
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditNote =  (data:any) => {
      setEdit(data);
      setContent(data.content)
   
  };
  const handleChangeEdit = async ()=>{
    try {
      let body = {
        courses_id: [edit.courses_id],
        sub_lesson_id: [edit.sub_lesson_id[0]._id],
        content: content,
        user_id: [edit.user_id],
        time: edit.time,
        _id:edit._id
      };
      let data = await updateNote(body)
      if(data?.status==0){
        setEdit(null)
      
        
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <NoteView
        toggleDrawerNote={toggleDrawerNote}
        handleEditorChange={handleEditorChange}
        content={content}
        setEdit={setEdit}
        edit={edit}
        handleEditNote={handleEditNote}
        data={data?.status == 0 && data.data}
        handleDeleteNote={handleDeleteNote}
        openNote={openNote}
        handleChangeEdit={handleChangeEdit}
      />
    </>
  );
};

export default NoteController;
