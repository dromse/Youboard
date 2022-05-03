import { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import mockData from '../../mockData'

import './table.scss'
import Card from '../card/card.jsx'

const Table = () => {
    const [data, setData] = useState(mockData)

    const onDragEnd = (result) => {
        console.log(result)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='table'>
                {/* render lists */}
                {data.map((section) => (
                    <Droppable key={section.id} droppableId={section.id}>
                        {(provided) => (
                            // render list
                            <div
                                {...provided.droppableProps}
                                className='table__section'
                                ref={provided.innerRef}
                            >
                                {/* render list title */}
                                <div className='table__section__title'>
                                    {section.title}
                                </div>

                                {/* render list content */}
                                <div className='table__section__content'>
                                    {section.tasks.map((task, index) => (
                                        <Card key={index}>{task.title}</Card>
                                    ))}
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
