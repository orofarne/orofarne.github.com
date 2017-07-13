
class: center, middle

# Go

---

class: center, middle

# Go?!

---

class: center, middle

<img src="img/go-lang-5-638.jpg" style="height:80%;" />

---

# Team

<img src="img/team.png" style="width:100%;" />

---

class: center, middle

# Структуры данных

---

# Slice

.resize[![Slice description](img/go-slices-usage-and-internals_slice-struct.png)]

```go
type slice struct {
	array unsafe.Pointer
	len   int
	cap   int
}
```

---

# Slice

.resize[![Slice description](img/go-slices-usage-and-internals_slice-1.png)]

```go
s := make([]byte, 5)
```

---

# Slice

.resize[![Slice description](img/go-slices-usage-and-internals_slice-2.png)]

```go
s[2:4]
```

---
layout: false

# String

Неизменяемый массив байт

```go
type stringStruct struct {
	str unsafe.Pointer
	len int
}
```

---

# Map

.resize[![Maps description](img/r3.png)]

---

# Map

.resize[![Maps description](img/r4.png)]

Когда размера бакета не хватает, выделяется новый и добавляется ссылка в старом бакете. В определённый момент, хэш таблица решит перестраиваться.

---

# Map

.resize[![Maps description](img/r5.png)]

Выделяется память в два раза большего размера чем раньше. И постепенно все бакеты туда эвакуируются. При обращении к ним.

---

# Эскейп анализ

1. Go сам решает, где выделяется память
2. Определяет, выходят ли указатели на значение за функцию или нет
3. Если нет, то данные спокойно располагаются на стеке (с исключениями)
4. Данные на стеке удаляются после выхода из функции и освобождения стека все скопом.
5. Нет повода беспокоить сборщик мусора

---

# Вопросы?

<center><img src="img/bc75225ef044d29d1f2d1c051d9b8063.gif" style="height:100%;" /></center>
