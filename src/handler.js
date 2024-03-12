import { nanoid } from "nanoid";
import books from "./books.js";

export const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = readPage === pageCount ? true : false;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  if (!name) {
    return h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    return h
      .response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          bookId: id,
        },
      })
      .code(201);
  }
};

export const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  if (name) {
    const getAllBookByQueryName = books
      .filter((book) =>
        book.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
      )
      .map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));

    return h
      .response({
        status: "success",
        data: {
          books: getAllBookByQueryName,
        },
      })
      .code(200);
  }

  if (reading === "0" || reading === "1") {
    const isReading = reading === "1";

    const getAllBookByQueryReading = books
      .filter((book) => book.reading === isReading)
      .map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));

    return h
      .response({
        status: "success",
        data: {
          books: getAllBookByQueryReading,
        },
      })
      .code(200);
  }

  if (finished === "0" || finished === "1") {
    const isFinished = finished === "1";

    const getAllBookByQueryFinished = books
      .filter((book) => book.finished === isFinished)
      .map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));

    return h
      .response({
        status: "success",
        data: {
          books: getAllBookByQueryFinished,
        },
      })
      .code(200);
  }

  return h
    .response({
      status: "success",
      data: {
        books: books.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    })
    .code(200);
};

export const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.find((book) => book.id === bookId);

  if (book !== undefined) {
    return h
      .response({
        status: "success",
        data: {
          book,
        },
      })
      .code(200);
  }

  return h
    .response({
      status: "fail",
      message: "Buku tidak ditemukan",
    })
    .code(404);
};

export const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const finished = pageCount === readPage ? true : false;
  const updatedAt = new Date().toISOString();

  if (!name) {
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Mohon isi nama buku",
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };

    return h
      .response({
        status: "success",
        message: "Buku berhasil diperbarui",
      })
      .code(200);
  }

  return h
    .response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    })
    .code(404);
};

export const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    return h
      .response({
        status: "success",
        message: "Buku berhasil dihapus",
      })
      .code(200);
  }

  return h
    .response({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    })
    .code(404);
};
