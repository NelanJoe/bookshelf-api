# Books API Spec

## Create Book API

Endpoint: POST /books

Response body success:

```json
{
  "status": "success",
  "message": "Buku berhasil ditambahkan",
  "data": {
    "bookId": "Xo_hSF_9FmgT1_C8"
  }
}
```

Response body error:

Jika field nama buku kosong:

```json
{
  "status": "fail",
  "message": "Gagal menambahkan buku. Mohon isi nama buku"
}
```

Jika readPage lebih besar dari pageCount:

```json
{
  "status": "fail",
  "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
}
```

## Get Books API

Endpoint: GET /books

Response Body Success:

Jika catatan kosong:

```json
{
  "status": "success",
  "data": {
    "books": []
  }
}
```

Jika catatan ada:

```json
{
  "status": "success",
  "data": {
    "books": [
      {
        "id": "SzBxSR48gjWQRfeR",
        "name": "Harry Potter",
        "publisher": "Dicoding Indonesia"
      },
      {
        "id": "FNk34Is4A4eIll2n",
        "name": "Harry Potter",
        "publisher": "Dicoding Indonesia"
      },
      {
        "id": "Xo_hSF_9FmgT1_C8",
        "name": "Harry Potter",
        "publisher": "Dicoding Indonesia"
      }
    ]
  }
}
```

## Get Book API

Endpoint: GET /books/:bookId

Response body success:

```json
{
  "status": "success",
  "data": {
    "book": {
      "id": "MQIpueLVx9hIuU1V",
      "name": "Buku A",
      "year": 2010,
      "author": "John Doe",
      "summary": "Lorem ipsum dolor sit amet",
      "publisher": "Dicoding Indonesia",
      "pageCount": 100,
      "readPage": 25,
      "finished": false,
      "reading": false,
      "insertedAt": "2024-03-12T01:01:45.265Z",
      "updatedAt": "2024-03-12T01:01:45.265Z"
    }
  }
}
```

Response body error:

```json
{
  "status": "fail",
  "message": "Buku tidak ditemukan"
}
```

## Update Book API

Endpoint: PUT /books/:bookId

Response body success:

```json
{
  "status": "success",
  "message": "Buku berhasil diperbarui"
}
```

Response body error:

Jika field nama buku kosong:

```json
{
  "status": "fail",
  "message": "Gagal menambahkan buku. Mohon isi nama buku"
}
```

Jika readPage lebih besar dari pageCount:

```json
{
  "status": "fail",
  "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
}
```

```json
{
  "status": "fail",
  "message": "Gagal memperbarui buku. Id tidak ditemukan"
}
```

## Delete Book API

Endpoint: DELETE /books/:bookId

Response body success:

```json
{
  "status": "success",
  "message": "Buku berhasil dihapus"
}
```

Response body error:

```json
{
  "status": "fail",
  "message": "Buku gagal dihapus. Id tidak ditemukan"
}
```
