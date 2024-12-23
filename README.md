# Hono Todo API

이 프로젝트는 Hono 프레임워크를 사용하여 Clean Architecture 패턴으로 구현된 Todo API입니다.

## 프로젝트 구조

```
src/
├── domain/              # 도메인 레이어
│   └── entities/        # 도메인 엔티티
├── application/         # 애플리케이션 레이어
│   └── useCases/       # 비즈니스 로직
├── infrastructure/      # 인프라스트럭처 레이어
│   └── repositories/   # 데이터 저장소
└── interfaces/         # 인터페이스 레이어
    └── controllers/    # API 컨트롤러
```

## 기능

- Todo 목록 조회 (`GET /todos`)
- 단일 Todo 조회 (`GET /todos/:id`)
- Todo 생성 (`POST /todos`)
- Todo 수정 (`PUT /todos/:id`)
- Todo 삭제 (`DELETE /todos/:id`)

## API 명세

### GET /todos
모든 Todo 항목을 조회합니다.

### GET /todos/:id
특정 ID의 Todo 항목을 조회합니다.

### POST /todos
새로운 Todo 항목을 생성합니다.

요청 본문:
```json
{
  "title": "새로운 할 일"
}
```

### PUT /todos/:id
특정 ID의 Todo 항목을 수정합니다.

요청 본문:
```json
{
  "title": "수정된 할 일",
  "completed": true
}
```

### DELETE /todos/:id
특정 ID의 Todo 항목을 삭제합니다.

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

### 테스트 실행

```bash
# 전체 테스트 실행
npm test

# 테스트 커버리지 확인
npm run test:coverage

# 테스트 감시 모드
npm run test:watch
```

### 프로덕션 빌드

```bash
npm run build
npm start
```

## 기술 스택

- [Hono](https://hono.dev/) - 웹 프레임워크
- TypeScript - 프로그래밍 언어
- Jest - 테스트 프레임워크
- Clean Architecture - 아키텍처 패턴

## 라이선스

ISC

## 작성자

Pyunghyuk Yoo
