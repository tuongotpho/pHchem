\# BÁO CÁO KẾ HOẠCH NÂNG CẤP pHchem



\[Repo pHchem](https://github.com/tuongotpho/pHchem?utm\_source=chatgpt.com)



\## 1. Mục tiêu phát triển



Phát triển \*\*pHchem\*\* từ ứng dụng tra cứu Hóa học thành:



> \*\*Bộ công cụ Hóa học thông minh — Chemistry Toolkit\*\*



Định hướng kiến trúc:



\*\*Tra cứu → Tính toán → Phản ứng → Luyện tập\*\*



Trọng tâm là xây dựng một \*\*Chemistry Engine\*\* và \*\*Chemistry Knowledge Base\*\* có cấu trúc, chính xác, có khả năng mở rộng, ưu tiên \*\*offline-first\*\*.



\---



\# 2. Kiến trúc mục tiêu



```text

&#x20;                        pHchem

&#x20;                          │

&#x20;         ┌────────────────┴────────────────┐

&#x20;         │                                 │

&#x20;  Chemistry Engine                  Knowledge Base

&#x20;         │                                 │

&#x20;  ┌──────┼──────┐                  ┌───────┼────────┐

&#x20;  │      │      │                  │       │        │

&#x20;Formula Equation Stoichiometry   Elements Compounds Reactions

&#x20;  │      │      │                  │       │        │

&#x20;  ├──────┼──────┤                  └───────┼────────┘

&#x20;  │      │      │                          │

&#x20;  pH   Acid/Base Redox                 Search

&#x20;  │      │      │                          │

&#x20;  └──────┴──────┴──────────────┬───────────┘

&#x20;                               │

&#x20;                             React

&#x20;                               │

&#x20;                              PWA

&#x20;                               │

&#x20;                        Offline-first

```



\---



\# 3. Giai đoạn 1 — Hoàn thiện Chemistry Engine



\### Ưu tiên: P0



Mở rộng Calculator hiện tại thành:



\## Chemistry Calculator



\### 3.1. Khối lượng mol



\* Tính M từ công thức.

\* Tính % khối lượng nguyên tố.

\* Hỗ trợ ngoặc.

\* Hỗ trợ hydrate.

\* Chuẩn hóa công thức.



Ví dụ:



```text

Ca(OH)2

CuSO4·5H2O

(NH4)2SO4

```



\---



\### 3.2. Tính số mol



Các dạng:



```text

n = m / M

n = V / Vm

n = C × V

```



Cho phép chuyển đổi:



```text

Mass ↔ Mol

Volume ↔ Mol

Concentration ↔ Mol

```



\---



\### 3.3. Tính khối lượng



```text

m = n × M

```



Cho phép nhập:



\* chất

\* số mol



→ trả về khối lượng.



\---



\### 3.4. Tính nồng độ



Hỗ trợ:



\* nồng độ mol

\* nồng độ phần trăm

\* nồng độ ion nếu phù hợp.



Ví dụ:



```text

n = 0.2 mol

V = 500 mL



→ C = 0.4 M

```



\---



\### 3.5. Pha loãng



Áp dụng:



```text

C₁V₁ = C₂V₂

```



Có giao diện nhập:



\* C₁

\* V₁

\* C₂

\* V₂



và tự động xác định đại lượng cần tính.



\---



\### 3.6. pH Calculator



Xây dựng theo từng mức:



\*\*Mức 1\*\*



\* Acid mạnh

\* Base mạnh



\*\*Mức 2\*\*



\* Acid yếu

\* Base yếu



\*\*Mức 3\*\*



\* Buffer

\* Muối thủy phân



\*\*Mức 4\*\*



\* Trộn acid/base

\* Chuẩn độ



Kết quả cần hiển thị cả:



```text

pH

pOH

\[H+]

\[OH-]

```



kèm công thức sử dụng.



\---



\# 4. Giai đoạn 2 — Reaction Engine



\### Ưu tiên: P0



Xây dựng hệ thống phản ứng hóa học có cấu trúc.



Mỗi reaction nên có:



```text

id

reactants

products

coefficients

type

conditions

phenomenon

ionicEquation

notes

source

```



\---



\## 4.1. Phân loại phản ứng



Hỗ trợ:



\* Hóa hợp

\* Phân hủy

\* Thế

\* Trao đổi

\* Acid-base

\* Trung hòa

\* Kết tủa

\* Oxi hóa – khử

\* Đốt cháy

\* Este hóa

\* Xà phòng hóa



\---



\## 4.2. Reaction Explorer



Ví dụ:



\### HCl + NaOH



```text

HCl + NaOH → NaCl + H₂O

```



Hiển thị:



\*\*Loại:\*\* phản ứng trung hòa



\*\*Phương trình ion rút gọn:\*\*



```text

H⁺ + OH⁻ → H₂O

```



\*\*Hiện tượng:\*\* ...



\*\*Điều kiện:\*\* ...



\---



\## 4.3. Liên kết Reaction ↔ Element ↔ Compound



Ví dụ:



```text

Fe

│

├── FeO

├── Fe₂O₃

├── Fe₃O₄

├── Fe(OH)₂

├── Fe(OH)₃

├── FeCl₂

├── FeCl₃

└── Reactions

```



Người dùng có thể đi từ một nguyên tố đến các hợp chất và phản ứng liên quan.



\---



\# 5. Giai đoạn 3 — Chemistry Knowledge Base



\### Ưu tiên: P0/P1



Chuẩn hóa ba thực thể chính:



```text

Element

Compound

Reaction

```



\---



\## 5.1. Element



Tiếp tục mở rộng:



\* Atomic number

\* Atomic mass

\* Group

\* Period

\* Block

\* Electron configuration

\* State

\* Melting point

\* Boiling point

\* Density

\* Electronegativity

\* Discovery

\* Applications

\* Oxidation states

\* Facts

\* Related compounds

\* Related reactions



\---



\## 5.2. Compound



Mỗi hợp chất nên có:



```text

id

formula

name\_vi

name\_en

category

molarMass

elements

smiles

structure

properties

uses

preparation

reactions

safety

source

```



Ví dụ:



\### H₂SO₄



```text

Axit sulfuric



M = 98.079 g/mol



Elements:

H, S, O



Category:

Inorganic / Acid



Structure:

SVG



Reactions:

...



Uses:

...



Safety:

...

```



\---



\# 6. Giai đoạn 4 — Universal Chemistry Search



\### Ưu tiên: P1



Nâng cấp Search thành \*\*trung tâm truy cập toàn bộ cơ sở dữ liệu\*\*.



Người dùng có thể nhập:



```text

Fe

```



→ Element.



```text

sắt

```



→ Fe.



```text

H2SO4

```



→ Compound.



```text

axit sulfuric

```



→ Compound.



```text

HCl + NaOH

```



→ Reaction.



```text

pH HCl 0.01M

```



→ mở pH Calculator.



\---



\## Search cần hỗ trợ



\* Element

\* Compound

\* Formula

\* Reaction

\* Dictionary

\* Fact

\* Calculator action.



\---



\# 7. Giai đoạn 5 — Favorites \& History



\### Ưu tiên: P1



Không cần backend.



Sử dụng:



```text

localStorage

```



hoặc:



```text

IndexedDB

```



\---



\## Favorites



Cho phép lưu:



\* nguyên tố

\* hợp chất

\* phản ứng

\* công thức

\* kết quả tính toán.



\---



\## History



Lưu các thao tác gần đây:



```text

16:43 — H₂SO₄ → 98.079 g/mol

16:41 — Fe + O₂ → cân bằng

16:35 — NaOH → tra cứu

16:31 — HCl 0.01M → pH 2

```



Cho phép click để mở lại.



\---



\# 8. Giai đoạn 6 — Data Integrity \& Data Provenance



\### Ưu tiên: P1



Tiếp tục xây dựng hệ thống kiểm tra dữ liệu.



\## Validation



Kiểm tra:



\* đủ 118 nguyên tố

\* atomic number unique

\* symbol unique

\* tên unique

\* mass hợp lệ

\* group hợp lệ

\* period hợp lệ

\* state hợp lệ

\* physical properties hợp lệ

\* công thức hợp lệ.



\---



\## Data provenance



Các dữ liệu quan trọng nên có:



```text

source

reference

updatedAt

```



Ví dụ:



```ts

{

&#x20; value: 1538,

&#x20; source: "NIST"

}

```



Hoặc:



```ts

{

&#x20; value: 1538,

&#x20; source: "IUPAC"

}

```



UI có thể hiển thị:



> Nguồn dữ liệu: NIST / IUPAC



\---



\# 9. Giai đoạn 7 — Chuẩn hóa Chemistry Code



\### Ưu tiên: P1



Tách domain logic khỏi React components.



Định hướng:



```text

src/

├── chemistry/

│   ├── formula/

│   ├── equation/

│   ├── stoichiometry/

│   ├── acid-base/

│   ├── solubility/

│   ├── redox/

│   ├── elements/

│   └── reactions/

│

├── data/

│   ├── elements/

│   ├── compounds/

│   ├── reactions/

│   ├── formulas/

│   └── dictionary/

│

├── features/

│   ├── periodic-table/

│   ├── calculator/

│   ├── formulas/

│   ├── reactions/

│   └── search/

│

├── components/

└── pages/

```



UI chỉ gọi Chemistry Engine.



\---



\# 10. Giai đoạn 8 — Nâng cấp Test



\### Ưu tiên: P1



Tách test thành các nhóm.



\### Data Schema Tests



```text

elements.schema.test.ts

compounds.schema.test.ts

reactions.schema.test.ts

```



\### Chemistry Tests



```text

formula.test.ts

balance.test.ts

stoichiometry.test.ts

acid-base.test.ts

solubility.test.ts

```



\### Regression Tests



Lưu các trường hợp hóa học đặc biệt:



```text

Ca(OH)2

Al2(SO4)3

CuSO4·5H2O

(NH4)2SO4

```



và các phản ứng phức tạp.



Mục tiêu:



> \*\*Mọi Chemistry Engine mới đều phải có test trước khi đưa vào production.\*\*



\---



\# 11. Giai đoạn 9 — Chemistry Practice



\### Ưu tiên: P2



Phát triển module luyện tập.



\## Chủ đề



\* Nguyên tử

\* Bảng tuần hoàn

\* Liên kết

\* Vô cơ

\* Hữu cơ

\* Acid-base

\* Nitrogen

\* Sulfur

\* Điện hóa

\* Hóa học hữu cơ.



\## Mức độ



\* Nhận biết

\* Thông hiểu

\* Vận dụng

\* Vận dụng cao.



\---



\# 12. Giai đoạn 10 — Quiz \& Exam Mode



\### Ưu tiên: P2



Cho phép:



```text

Chọn chủ đề

↓

Chọn số câu

↓

Chọn mức độ

↓

Làm bài

↓

Chấm điểm

↓

Phân tích kết quả

```



Có thể phát triển sau này để kết nối với hệ thống ngân hàng câu hỏi/trộn đề riêng.



\---



\# 13. Giai đoạn 11 — AI Tutor



\### Ưu tiên: P3



AI không đảm nhiệm các phép tính hóa học cốt lõi.



Nguyên tắc:



```text

Chemistry Engine

&#x20;     ↓

Tính toán chính xác



AI

&#x20;     ↓

Giải thích

Hướng dẫn

Đặt câu hỏi

Tạo ví dụ

```



Ví dụ:



> Tại sao FeCl₃ + NaOH tạo Fe(OH)₃?



AI giải thích cơ chế và hiện tượng dựa trên dữ liệu của pHchem.



\---



\# 14. Giai đoạn 12 — Tối ưu PWA



Tiếp tục duy trì:



> \*\*Offline-first\*\*



Không đưa backend vào nếu chưa thực sự cần.



Tối ưu:



\* lazy loading

\* code splitting

\* IndexedDB

\* caching

\* generated structures

\* image/SVG optimization

\* mobile performance.



Với số lượng compound tăng mạnh, không nên tiếp tục tải toàn bộ structure vào bundle.



\---



\# 15. Giai đoạn 13 — Favorites/History Sync



\### Chỉ triển khai khi thực sự cần



Sau khi local version ổn định mới cân nhắc:



```text

Firebase / Supabase

&#x20;       ↓

Authentication

&#x20;       ↓

Sync

&#x20;       ↓

Favorites

History

Notes

Progress

```



Không đưa cloud database vào Chemistry Engine.



\---



\# 16. Thứ tự triển khai đề xuất



\## Version 0.3



\### Chemistry Calculator 2.0



\* \[ ] Mol

\* \[ ] Mass

\* \[ ] Concentration

\* \[ ] Dilution

\* \[ ] Stoichiometry

\* \[ ] pH cơ bản



\---



\## Version 0.4



\### Chemistry Knowledge Base



\* \[ ] Compound model

\* \[ ] Compound Detail

\* \[ ] Element ↔ Compound

\* \[ ] Reaction model

\* \[ ] Element ↔ Reaction

\* \[ ] Compound ↔ Reaction



\---



\## Version 0.5



\### Reaction Engine



\* \[ ] Reaction database

\* \[ ] Reaction Explorer

\* \[ ] Reaction classification

\* \[ ] Ionic equation

\* \[ ] Conditions

\* \[ ] Phenomena

\* \[ ] Reaction search



\---



\## Version 0.6



\### Universal Search



\* \[ ] Element search

\* \[ ] Compound search

\* \[ ] Reaction search

\* \[ ] Formula search

\* \[ ] Dictionary search

\* \[ ] Fact search

\* \[ ] Calculator shortcuts



\---



\## Version 0.7



\### Personalization



\* \[ ] Favorites

\* \[ ] History

\* \[ ] Recent calculations

\* \[ ] Notes

\* \[ ] IndexedDB.



\---



\## Version 0.8



\### Education



\* \[ ] Quiz

\* \[ ] Practice

\* \[ ] Flashcards

\* \[ ] Exam Mode

\* \[ ] Progress tracking.



\---



\## Version 0.9



\### AI



\* \[ ] AI explanation

\* \[ ] AI Tutor

\* \[ ] AI question generation

\* \[ ] AI error analysis.



\---



\## Version 1.0



\### pHchem Chemistry Toolkit



```text

Periodic Table

&#x20;      +

Compound Database

&#x20;      +

Reaction Database

&#x20;      +

Chemistry Calculator

&#x20;      +

Universal Search

&#x20;      +

Practice

&#x20;      +

AI Tutor

&#x20;      +

Offline PWA

```



\---



\# 17. Nguyên tắc phát triển



\### 1. Accuracy First



Dữ liệu hóa học phải chính xác trước khi mở rộng tính năng.



\### 2. Offline First



Các chức năng cốt lõi phải hoạt động không cần Internet.



\### 3. Deterministic First



Phép tính phải do Chemistry Engine xử lý, không giao cho AI.



\### 4. Data-driven



UI không chứa dữ liệu hóa học cứng.



\### 5. Test-driven



Tính năng Chemistry Engine mới phải có test.



\### 6. Source-aware



Dữ liệu quan trọng phải có nguồn.



\### 7. Modular



Mỗi domain hóa học là một module độc lập.



\### 8. Progressive Enhancement



Không đưa Firebase/AI/backend vào khi chưa cần.



\---



\# 18. Thứ tự ưu tiên cuối cùng



| Ưu tiên | Hạng mục                      | Mức   |

| ------- | ----------------------------- | ----- |

| 1       | Chemistry Calculator 2.0      | 🔴 P0 |

| 2       | Chemistry Engine              | 🔴 P0 |

| 3       | Compound Database             | 🔴 P0 |

| 4       | Reaction Engine               | 🔴 P0 |

| 5       | Element ↔ Compound ↔ Reaction | 🔴 P0 |

| 6       | Universal Search              | 🟠 P1 |

| 7       | Data provenance               | 🟠 P1 |

| 8       | Data/Test architecture        | 🟠 P1 |

| 9       | Favorites + History           | 🟠 P1 |

| 10      | Quiz/Practice                 | 🟡 P2 |

| 11      | Exam Mode                     | 🟡 P2 |

| 12      | AI Tutor                      | 🟢 P3 |

| 13      | Cloud Sync                    | 🟢 P3 |



\---



\## Định hướng sản phẩm cuối



\*\*pHchem không phát triển theo hướng “thêm thật nhiều trang”.\*\*



Mục tiêu là xây dựng một hệ thống:



> \*\*Chemistry Engine + Chemistry Knowledge Base + Education Tools\*\*



trong đó người dùng có thể:



\*\*Tra cứu một chất → xem tính chất → xem cấu trúc → xem phản ứng → tính toán → luyện tập → được giải thích.\*\*



Đây là kiến trúc mục tiêu xuyên suốt cho các phiên bản tiếp theo của \*\*pHchem\*\*.



