# Mobile coverage

All scenarios run in Safari on iPhone 17 Pro/iOS 26 and Chrome on Galaxy S25/Android 15.

| Area | Spec | Cases per platform |
|---|---|---:|
| Authentication and session | `auth.spec.ts` | 3 |
| Dashboard tabs and widgets | `dashboard-tabs.spec.ts` | 8 |
| Dashboard interactions | `dashboard-interactions.spec.ts` | 6 |
| Responsive sidebar modules | `sidebar-modules.spec.ts` | 32 |
| Core and extension browsing/search | `browse.spec.ts` | 54 |
| Create/cancel forms | `create-forms.spec.ts` | 10 |
| Global quick create | `quick-create.spec.ts` | 10 |
| Email folders and compose | `emails.spec.ts` | 8 |
| Calendar controls | `calendar.spec.ts` | 3 |
| Opportunity kanban | `opportunities.spec.ts` | 6 |
| Knowledge Base categories | `knowledge-base.spec.ts` | 4 |
| Record navigation | `record-navigation.spec.ts` | 10 |
| Header controls | `header-controls.spec.ts` | 6 |
| Sales & Purchases navigation | `sales-purchases.spec.ts` | 12 |
| **Total** | **14 spec files** | **172** |

Public-demo tests are read-only. Save, delete, conversion, file upload, outbound email, and drag-and-drop mutation cases remain in the local desktop framework because they should not modify shared demo data.
