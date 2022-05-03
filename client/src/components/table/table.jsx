import { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import mockData from '../../mockData.js'

import './table.scss'

const Table = () => {
    const [data, setData] = useState(mockData)

    const onDragEnd = (result) => {
        console.log(result)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='table'>
                {data.map((section) => (
                    <Droppable key={section.id} droppableId={section.id}>
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                className='table__section'
                                ref={provided.innerRef}
                            >
                                <div className='table__section__title'>
                                    {section.title}
                                </div>
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    )
}

export default Table
