import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
type Props = {
  page: string | number;
  pages: string | number;
  isAdmin: boolean;
  keyword: string;
};
// Pages = total count

const Paginate = ({ page, pages, isAdmin = false, keyword = '' }: Props) => {
  return (
    <div>
      {pages > 1 && (
        <Pagination>
          {[...Array(pages).keys()].map((x: any) => (
            <LinkContainer
              key={x + 1}
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${x + 1}`
                    : `/page/${x + 1}`
                  : `/admin/productList/${x + 1}`
              }
            >
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          ))}
        </Pagination>
      )}
    </div>
  );
};
Paginate.defaultProps = {
  isAdmin: false,
};
export default Paginate;
