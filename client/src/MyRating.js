import React from 'react'
import { Rating } from 'react-simple-star-rating'

export default function MyRating(props) {
    var oldRating = props.value;

    return (
        <div className='MyRating'>
            <Rating
                initialValue={props.value}
                ratingValue={undefined}
                onClick={(rating) => {
                    props.onChange(oldRating, rating / 20)
                    oldRating = rating / 20;
                }}
                size={18}
                label
                transition
                fillColor='orange'
                emptyColor='gray'
                className='foo' // Will remove the inline style if applied
            />
        </div>
    )
}