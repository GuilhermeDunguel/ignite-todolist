import {Trash } from 'phosphor-react'
import './Task.scss'
import * as Checkbox from '@radix-ui/react-checkbox'
import { useState } from 'react';
import checkedIcon from '../../../assets/checkedIcon.svg'

interface TasksProps {
  content: string;
  isCompleted: boolean;
  deleteTaskFunction: (content: string) => void;
  completeTaskFunction: (content: string) => void;
}

export function Task(props: TasksProps) {

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)

  return (
    <div className='taskWrapper'>
      <div className='checkboxAndTitleWrapper'>
        <Checkbox.Root
          className={isCheckboxChecked ? 'checkboxChecked checkbox' : 'checkboxUnchecked checkbox'}
          onClick={() => props.completeTaskFunction(props.content)}
          id='checkboxId'
          checked={isCheckboxChecked}
          onCheckedChange={() => {
            isCheckboxChecked === true ? 
              setIsCheckboxChecked(false) :
              setIsCheckboxChecked(true)}}
          >
          <Checkbox.Indicator>
            <img className='checkedIcon' src={checkedIcon} alt="" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        {props.isCompleted === true ? 
        <span className='taskIsCompleted'>{props.content}</span> :
        <span className='taskIsIncompleted'>{props.content}</span>}
      </div>
      <button className='deleteButton' onClick={() => props.deleteTaskFunction(props.content)}><Trash size={21} /></button>
    </div>
  )
}
