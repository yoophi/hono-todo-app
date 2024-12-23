# Hono Todo API

이 프로젝트는 Hono 프레임워크를 사용하여 구현된 간단한 Todo API입니다.

## 기능

- Todo 목록 조회
- 단일 Todo 조회
- Todo 생성
- Todo 수정
- Todo 삭제

## 시작하기

### 필수 조건

- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 복제
git clone [저장소 URL]
cd hono-todo-api

# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

### 프로덕션 빌드

```bash
npm run build
npm start
```

## API 엔드포인트

### GET /todos
모든 Todo 항목을 조회합니다.

### GET /todos/:id
특정 ID의 Todo 항목을 조회합니다.

### POST /todos
새로운 Todo 항목을 생성합니다.

요청 본문 예시:
```json
{
  "title": "새로운 할 일"
}
```

### PUT /todos/:id
특정 ID의 Todo 항목을 수정합니다.

요청 본문 예시:
```json
{
  "title": "수정된 할 일",
  "completed": true
}
```

### DELETE /todos/:id
특정 ID의 Todo 항목을 삭제합니다.

## 기술 스택

- [Hono](https://hono.dev/) - 웹 프레임워크
- TypeScript - 프로그래밍 언어
- @hono/node-server - Node.js 서버

## 라이선스

ISC

## 작성자

Pyunghyuk Yoo
