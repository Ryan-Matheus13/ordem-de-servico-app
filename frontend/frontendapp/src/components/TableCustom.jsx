import React, { useEffect, useState } from "react";

export default function TableCustom({ headerData, rowsData, showRow }) {
  const [headers, setHeaders] = useState(headerData);
  const [rows, setRows] = useState(rowsData);
  
  return (
    <div className="table-container">
      <table className="table-custom">
        <thead>
          <tr>
            {headers.map((item, index) => {
              return <th style={{ width: item.tamanho }}>{item.value}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {rows.length >= 1 && (
            <>
              {rows.map((item, index) => {
                return (
                  <>
                    <tr onClick={() => showRow(item[0])} key={index}>
                      {item.map((dado, index) => {
                        return <td key={index}>{dado}</td>;
                      })}
                    </tr>
                    
                  </>
                );
              })}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
