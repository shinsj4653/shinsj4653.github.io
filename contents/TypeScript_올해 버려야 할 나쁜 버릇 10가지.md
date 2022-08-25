---
date: '2022-08-25'
title: '타입스크립트 나쁜 버릇 10가지'
categories: ['TypeScript']
summary: ''
thumbnail: './images/thumbnail-typescript.png'
---

"올해 버려야 할 타입스크립트 나쁜 버릇 10가지" 라는 블로그 글을 읽으면서 정리를 해보았다.

# 1. strict 모드 사용하지 않는다.

> 잘못된 코드

ts.config에서 strict모드를 사용하지 않는다.

```ts
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "commonjs"
  }
}
```

> 잘못된 이유

엄격한 룰은 나중에 코드를 수정하기 쉽게 만들어 주기 때문이다.

> 올바른 코드

```ts
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "commonjs",
    "strict": true
  }
}
```

# 2. 디폴트 값을 || 을 사용해 정의한다.

> 잘못된 코드

옵셔널 한 값 `||` 을 이용해 보정한다.

```ts
function createBlogPost(text: string, author: string, date?: Date) {
  return {
    text: text,
    author: author,
    date: date || new Date(),
  }
}
```

> 잘못된 이유

`??` 는 `||` 와 달리 모든 falsy 한 값이 아니라 null 과 undefined 값만 보정한다.

> 올바른 코드

`??` 연산자를 사용하거나, 디폴트 인자를 사용한다.

```ts
function createBlogPost (text: string, author: string, date: Date = new Date())
  return {
    text: text,
    author: author,
    date: date
  }
}
```

# 3. any 타입을 사용한다.

> 잘못된 코드

사용하는 데이터의 구조를 파악하기 힘들 때 any 타입을 사용한다.

```ts
async function loadProducts(): Promise<Product[]> {
  const response = await fetch('https://api.mysite.com/products')
  const products: any = await response.json()
  return products
}
```

> 잘못된 이유

any는 기본적으로 모든 타입 검증을 무력화한다. any로 오는 모든 것은 어떤 종류의 타입 검증보다도 우선한다. 이건 타입 구조에 대한 가정이 런타임 코드에 의해서만 실패하게 만들기 때문에 버그를 잡기 힘들게 만든다.

> 올바른 코드

any 타입 대신, unknown을 사용한다.

```ts
async function loadProducts(): Promise<Product[]> {
  const response = await fetch('https://api.mysite.com/products')
  const products: unknown = await response.json()
  return products as Product[]
}
```

# 4. val as SomeType

> 잘못된 코드

추론이 불가능한 타입에 대하여 컴파일러에게 강제로 알려준다.

```ts
async function loadProducts(): Promise<Product[]> {
  const response = await fetch('https://api.mysite.com/products')
  const products: unknown = await response.json()
  return products as Product[]
}
```

> 잘못된 이유

js에서 ts로 변환할 때 타입스크립트 컴파일러가 자동으로 추론하지 못하는 타입들을 위해 일부 가정을 만들어야 했다. 이런 경우 as SomeOtherType을 사용해서 tsconfig의 설정을 완화할 필요 없이 빠르고 쉽게 변화할 수 있었다.  
그러나, 이런 단언이 현재는 유용할 지 몰라도 누군가 코드를 이동하게 되면 상황은 달라진다. `타입가드` 를 사용하여 모든 것을 명시적으로 검증했음을 보장 가능하다.

> 올바른 코드

타입가드를 사용한 올바른 코드이다.

```ts
function isArrayOfProducts(obj: unknown): obj is Product[] {
  return Array.isArray(obj) && obj.every(isProduct)
}

function isProduct(obj: unknown): obj is Product {
  return obj != null && typeof (obj as Product).id === 'string'
}

async function loadProducts(): Promise<Product[]> {
  const response = await fetch('https://api.mysite.com/products')
  const products: unknown = await response.json()
  if (!isArrayOfProducts(products)) {
    throw new TypeError('Received malformed products API response')
  }
  return products
}
```

# 5. 테스트에서의 as any

> 잘못된 코드

테스트를 작성할 때 불완전한 대리 타입을 사용한다.

```ts
interface User {
  id: string
  firstName: string
  lastName: string
  email: string
}

test('createEmailText returns text that greats the user by first name', () => {
  const user: User = {
    firstName: 'John'
  } as any

  expect(createEmailText(user)).toContain(user.firstName)
}
```

> 잘못된 이유

나중에 프로퍼티 값 중 하나가 변경된다면 이 수정을 하나의 중심적인 위치가 아니라 모든 테스트에서 수정을 해야 한다. 또한 테스트 중인 코드가 이전까지 중요하게 생각하지 않았던 프로퍼티에 의존하는 상황으로 변할 수 있다.

> 올바른 코드

테스트에 모의(Mock) 데이터가 필요하다면, 쉽게 재사용 가능하게 다음과 같이 수정을 해준다.

```ts
interface User {
  id: string
  firstName: string
  lastName: string
  email: string
}

class MockUser implements User {
  id = 'id'
  firstName = 'John'
  lastName = 'Doe'
  email = 'john@doe.com'
}

test('createEmailText returns text that greats the user by first name', () => {
  const user = new MockUser()

  expect(createEmailText(user)).toContain(user.firstName)
}
```

# 6. 옵셔널 프로퍼티

> 잘못된 코드

프로퍼티가 있을 수도 있고 없을 수도 있다면 프로퍼티를 옵셔널로 만든다.

```ts
interface Product {
  id: string
  type: 'digital' | 'physical'
  weightInKg?: number
  sizeInMb?: number
}
```

> 잘못된 이유

좀 더 명시적인 타입을 가질수록 발견되지 않을 수 있었던 버그에 대한 컴파일 타입 검사를 받을 수 있다.

> 올바른 코드

명시적으로 있는 것과 없는 것의 조합으로 만든다.

```ts
interface Product {
  id: string
  type: 'digital' | 'physical'
}

interface DigitalProduct extends Product {
  type: 'digital'
  sizeInMb: number
}

interface PhysicalProduct extends Product {
  type: 'physical'
  weightInKg: number
}
```

# 7. 한 문자 제네릭

> 잘못된 코드

제네릭을 한 문자로 네이밍한다.

```ts
function head<T>(arr: T[]): T | undefined {
  return arr[0]
}
```

> 잘못된 이유

제네릭 타입 변수도 다른 변수와 마찬가지로 말 그대로 변수이다. 한 문자 변수 이름은 변수가 선언된 부분을 보지 않고서는 그 의미를 파악하기 힘들기 때문에 설명할 수 있는 이름을 부여하면 편리해진다.

> 올바른 코드

```ts
function head<Element>(arr: Element[]): Element | undefined {
  return arr[0]
}
```

# 8. Boolean이 아닌 것의 Boolean 검사

> 잘못된 코드

if 문에 직접 사용함으로써 값이 정의되어 있는지를 확인한다.

```ts
function createNewMessagesResponse(countOfNewMessages?: number) {
  if (countOfNewMessages) {
    return `You have ${countOfNewMessages} new messages`
  }
  return 'Error: Could not retrieve number of new messages'
}
```

> 잘못된 이유

실제로 확인하길 원하는 값이 무엇인지에 대해 생각을 해야 한다. countOfNewMessages가 0인 경우를 구별해줘야 한다.

> 올바른 코드

확인해야 할 조건을 명시적으로 검사한다.

```ts
function createNewMessagesResponse(countOfNewMessages?: number) {
  if (countOfNewMessages !== undefined) {
    return `You have ${countOfNewMessages} new messages`
  }
  return 'Error: Could not retrieve number of new messages'
}
```

# 9. 뱅뱅 연산자

> 잘못된 코드

Boolean이 아닌 값을 Boolean으로 변환한다.

```ts
function createNewMessagesResponse(countOfNewMessages?: number) {
  if (!!countOfNewMessages) {
    return `You have ${countOfNewMessages} new messages`
  }
  return 'Error: Could not retrieve number of new messages'
}
```

> 잘못된 이유

`!!` 의 사용은 코드를 이해하기 어렵게 만든다. 또한 잠재적인 버그도 만들기 쉽다.

> 올바른 코드

확인해야 할 조건을 명시적으로 검사한다.

```ts
function createNewMessagesResponse(countOfNewMessages?: number) {
  if (countOfNewMessages !== undefined) {
    return `You have ${countOfNewMessages} new messages`
  }
  return 'Error: Could not retrieve number of new messages'
}
```

# 10. != null

> 잘못된 코드

!= null 은 null 과 undefined를 동시에 검사한다.

```ts
function createNewMessagesResponse(countOfNewMessages?: number) {
  if (countOfNewMessages != null) {
    return `You have ${countOfNewMessages} new messages`
  }
  return 'Error: Could not retrieve number of new messages'
}
```

> 잘못된 이유

null은 값의 부재로, undefined는 값이 아직 없는 것으로 주로 인식을 한다. 예를 들어 `user.firstName === null` 은 말 그대로 유저가 이름을 갖고 있지 않는 거싱고, `user.firstName === undefined` 는 아직 해당 사용자에게 요청하지 않았음을 의미한다. 그리고 `user.firstName === ''` 은 말 그대로 이름이 '' 인 것을 의미한다.

> 올바른 코드

확인해야 할 조건을 명시적으로 검사한다.

```ts
function createNewMessagesResponse(countOfNewMessages?: number) {
  if (countOfNewMessages !== undefined) {
    return `You have ${countOfNewMessages} new messages`
  }
  return 'Error: Could not retrieve number of new messages'
}
```

# 참고링크

- [올해 버려야 할 타입스크립트 나쁜 버릇 10가지](https://ui.toast.com/weekly-pick/ko_20210217)
