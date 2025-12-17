#  상품 관리 프로젝트

Spring Boot + React(Vite) 기반의 간단한 상품 관리 웹 애플리케이션입니다.

---

##  프로젝트 개요

* **Backend**: Spring Boot, JPA, MySQL
* **Frontend**: React + Vite + Tailwind CSS
* **주요 기능**

    * 상품 등록
    * 상품 전체 조회

---

##  실행 환경

* Java 21
* Node.js 18+
* MySQL 8.x

---

##  프로젝트 구조

```
project1/
├── backend/        # Spring Boot Backend
└── frontend/       # React + Vite Frontend
```

---

##  API 명세서

### Base URL

```
http://localhost:8080
```

---

## 1. 상품 전체 조회

### 요청

* **URL**: `/api/products`
* **Method**: `GET`
* **설명**: 등록된 모든 상품을 조회한다.

### 응답 예시 (200 OK)

```json
[
  {
    "id": 1,
    "name": "S25U",
    "price": 500000,
    "category": "전자기기",
    "createdAt": "2025-12-17T16:19:56"
  },
  {
    "id": 2,
    "name": "빗자루",
    "price": 10000,
    "category": "생활용품",
    "createdAt": "2025-12-17T16:19:56"
  }
]
```

---

## 2. 상품 등록

### 요청

* **URL**: `/api/products`
* **Method**: `POST`

### Request Body

```json
{
  "name": "마우스",
  "price": 30000,
  "category": "전자기기"
}
```

### 응답 예시 (201 Created)

```json
{
  "id": 7,
  "name": "마우스",
  "price": 30000,
  "category": "전자기기",
  "createdAt": "2025-12-17T17:40:12"
}
```

---

##  데이터 모델

### Product

| 필드명       | 타입            | 설명            |
| --------- | ------------- | ------------- |
| id        | int           | 상품 고유 ID (PK) |
| name      | String        | 상품명           |
| price     | int           | 상품 가격         |
| category  | String        | 상품 카테고리       |
| createdAt | LocalDateTime | 생성일           |

---

##  상태 코드

| 코드  | 의미     |
| --- | ------ |
| 200 | 요청 성공  |
| 201 | 생성 성공  |
| 400 | 잘못된 요청 |
| 500 | 서버 오류  |

---

##  1일차 산출물 체크리스트

* [x] GitHub 리포지토리 생성 및 코드 Push
* [x] Backend / Frontend 폴더 분리
* [x] 로컬 DB 저장 및 조회 성공
* [x] API 명세서 작성

---

## 🏁 비고

* `createdAt` 값은 서버에서 자동 생성된다.
* 카테고리는 문자열 기반으로 저장된다.
* 프론트엔드에서 API를 호출하여 실시간으로 상품을 관리한다.
