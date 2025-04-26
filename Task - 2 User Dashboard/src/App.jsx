import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;
  const totalUsers = 10;
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  useEffect(() => {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/users?_page=${currentPage}&_limit=${usersPerPage}`
      )
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, [currentPage]);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className='container py-4'>
        <h2 className='text-center mb-4 fw-bold' style={{ color: "#1DCD9F" }}>
          User Dashboard
        </h2>

        {/* Search Bar */}
        <div className='row justify-content-center mb-4'>
          <div className='col-md-6'>
            <div className='input-group shadow-sm'>
              <span className='input-group-text bg-dark border-0 text-white'>
                <i className='bi bi-search'></i>
              </span>
              <input
                type='text'
                className='form-control dark-input'
                placeholder='Search users by name...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* User Cards */}
        {filteredUsers.length === 0 ? (
          <div className='alert alert-warning text-center' role='alert'>
            No users found.
          </div>
        ) : (
          <div className='row'>
            {filteredUsers.map((user) => (
              <div className='col-md-4 mb-4' key={user.id}>
                <div className='card h-100 border-0 shadow-sm card-custom'>
                  <div className='card-body'>
                    <h5 className='card-title' style={{ color: "#1DCD9F" }}>
                      <i className='bi bi-person-circle me-2'></i>
                      {user.name}
                    </h5>
                    <p className='card-text mb-1'>
                      <i className='bi bi-envelope-fill me-2 text-info'></i>
                      {user.email}
                    </p>
                    <p className='card-text'>
                      <i className='bi bi-telephone-fill me-2 text-info'></i>
                      {user.phone}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className='d-flex justify-content-center mt-5'>
          <nav>
            <ul className='pagination pagination-md'>
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button className='page-link border-0' onClick={handlePrevious}>
                  &laquo;
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <li
                    key={pageNum}
                    className={`page-item ${
                      currentPage === pageNum ? "active" : ""
                    }`}
                  >
                    <button
                      className='page-link border-0'
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  </li>
                )
              )}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className='page-link border-0'
                  style={{ backgroundColor: "#1DCD9F", color: "#000" }}
                  onClick={handleNext}
                >
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default App;
