import React, { useState } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';

const TagInput = ({ tags, setTags }) => {

    const[inputValue,setInputValue]= useState("")

    const handleInputChange =(e)=>{
        setInputValue(e.target.value)
    }

    const addNewTag =()=>{
        if (inputValue.trim() !== '') {
            setTags ( [...tags, inputValue.trim()]);
            setInputValue ("")
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addNewTag()
        }
        }
    
    const handleRemoveTag = (tagToRemove) =>{
        setTags (tags. filter ((tag) => tag !== tagToRemove) );
    }

  return (
    <div className="mt-3">
        {tags?. length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2" >
        {tags.map( (tag,index) => (
        <span key={index} className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded">
            # {tag}
            <button onClick={() => {handleRemoveTag(tag)}}>
                <MdClose />
            </button>
        </ span>
        ))}
        </div>
        )}
      {/* Flex container for input + button */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          className="bg-transparent text-sm border px-3 py-2 rounded outline-none flex-grow"
          placeholder="Add Tags"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button className="w-10 h-10 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700"
        onClick={()=>{addNewTag()}}>
          <MdAdd className="text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
