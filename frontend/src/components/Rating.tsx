import React from 'react';

type Props = {
  rating: number;
  reviews: string;
  color : string;
};

const Rating = ({ rating, reviews='',color }: Props) => {
  return (
    <div className='rating'>
      <span>
        <i style={{color}}
          className={
            rating >= 1
              ? 'fas fa-star'
              : rating >= 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
        <i style={{color}}
          className={
            rating >= 2
              ? 'fas fa-star'
              : rating >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
        <i style={{color}}
          className={
            rating >= 3
              ? 'fas fa-star'
              : rating >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
        <i style={{color}}
          className={
            rating >= 4
              ? 'fas fa-star'
              : rating >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
        <i style={{color}}
          className={
            rating >= 5
              ? 'fas fa-star'
              : rating >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      <span className='ms-2'>{reviews && reviews}</span>
    </div>
  );
};

Rating.defaultProps = {
    color : '#F8E825',
    reviews:''
}

export default Rating;
