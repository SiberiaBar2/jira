import React, { ReactNode, forwardRef } from "react";
import {
    Draggable,
    Droppable, 
    DroppableProps, 
    DroppableProvided, 
    DraggableProvided,
    DroppableProvidedProps, 
    DraggableProvidedDraggableProps, 
    DraggableProvidedDragHandleProps,
    DraggableProps, 
} from "react-beautiful-dnd";

type DropProps = Omit<DroppableProps, 'children'> & { children: ReactNode}

export const Drop = ({children, ...props}: DropProps) => {
    return <Droppable {...props}>
        {
            (provided) => {
                if (React.isValidElement<{
                    provided: {droppableProps: DroppableProvidedProps},
                    ref:  DroppableProvided["innerRef"],
                }>(children)) {
                    return React.cloneElement(children, {
                        ...provided.droppableProps,
                        ref: provided.innerRef,
                        provided,
                    });
                }
                return <div />;
            }
        }
    </Droppable>
};


type DropChildProps = 
    Partial<{provided: DroppableProvided} & DroppableProvidedProps >
    & React.HTMLAttributes<HTMLDivElement>

export const DropChild = forwardRef<HTMLDivElement, DropChildProps>(({children, ...props}, ref) => {
    return <div ref={ref} {...props}>
        {children}
        {props.provided?.placeholder}
    </div>;
}); 


type DragProps = Omit<DraggableProps, 'children'> & { children: ReactNode}

type DragValidAndClone = {
    provided: {
        draggableProps: DraggableProvidedDraggableProps
        dragHandleProps: DraggableProvidedDragHandleProps | undefined
    }
    ref: DraggableProvided["innerRef"]
}

export const Drag = ({children, ...props}: DragProps) => {
    return <Draggable {...props}>
        {
            provided => {
                if (React.isValidElement<DragValidAndClone>(children)) {
                    return React.cloneElement(children, {
                        ...provided.draggableProps,
                        ...provided.dragHandleProps,
                        ref: provided.innerRef,
                    });
                }
                return <div />
            }
        }
    </Draggable>
};
