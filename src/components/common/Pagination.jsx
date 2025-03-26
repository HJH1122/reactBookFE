import React from 'react'

const Pagination = ({currentPage, totalPage, blockSize, onClick}) => {
  const currentBlock = Math.ceil(currentPage/blockSize)
  const lastBlock = Math.ceil(totalPage/blockSize)
  const startPage = blockSize * (currentBlock-1) + 1
  console.log('currentPage:::' + currentPage);
  console.log('startPage:::' + startPage);
  return(<>
    <nav aria-label="Page navigation" style={{padding: '5px',textAlign:'left'}}>
      <ul className="pagination">
          {currentBlock > 1 && <li className="page-item">
            <a href="#" className="page-link" onClick={(e)=> {
            e.preventDefault()
            onClick((currentBlock-1)*blockSize)
          }}>Previous</a>
        </li>}
        {Array(blockSize).fill(startPage)
          .map((value, index) => value + index)
          .filter(pageNumber => pageNumber <= totalPage)
          .map(pageNumber => {
            return (
              <li className={`page-item ${currentPage == pageNumber? 'active on':''}`} 
                  key={pageNumber}
              >
                <a className="page-link" onClick={(e)=> {
                  e.preventDefault()
                  //console.log('pageNumber::' + pageNumber)
                  
                  onClick(pageNumber)
                  }} href="#">{pageNumber}
                </a>
              </li>
              )
          })
        }
        {totalPage > blockSize && currentBlock !== lastBlock && <li className="page-item">
          <a className="page-link" onClick={(e)=>{
            e.preventDefault()
            onClick(currentBlock * blockSize+1)
          }}>Next</a>
        </li>}
      </ul>
    </nav>
  </>)
}

export default Pagination