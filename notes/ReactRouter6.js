import {
  Route,
  Routes,
  Link,
  useParams,
  Outlet,
  useOutletContext,
} from 'react-router-dom';

// https://www.youtube.com/watch?v=Ul3y1LXxzdU
// Learn React Router v6 in 45 Minutes
// Web Dev Simplified
function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

function Books() {
  return (
    <div>
      <h1>Booklist</h1>
    </div>
  );
}

function Book() {
  const { id } = useParams();
  const obj = useOutletContext();
  return (
    <div>
      <h1>
        Book {id}: {obj.hello}
      </h1>
    </div>
  );
}

function NewBook() {
  return (
    <div>
      <h1>New Book</h1>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <code>404 page not found</code>
    </div>
  );
}

function BookLayout() {
  return (
    <ul>
      <li>
        <Link to="/books/1">Book 1</Link>
      </li>
      <li>
        <Link to="/books/2">Book 2</Link>
      </li>
      <li>
        <Link to="/books/new">New Book</Link>
      </li>
      {/* Outlet renders whatever the subsequent url is */}
      {/* Outlet can accept one things: context */}
      <Outlet context={{ hello: 'world' }} />
    </ul>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/books" element={<h2>More Extra Content</h2>} />
      </Routes>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/books">Books</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />

        {/*============================================
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<Book />} />
          <Route path="/books/new" element={<NewBook />} /> 
          =============================================*/}
        {/* Nested Routes */}
        <Route path="/books" element={<BookLayout />}>
          <Route index element={<Books />} />
          <Route path=":id" element={<Book />} />
          <Route path="new" element={<NewBook />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
