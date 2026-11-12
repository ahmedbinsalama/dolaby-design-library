# Actual prototype checks

The following local browser checks were completed on 11 November 2026 using synthetic session data. Evidence: `functional-results.json`.

- **P1:** rejected an empty description; a simulated input failure led to S17; Try again returned to S03 and retained “Ivory linen shirt”. Correction, clarification and preparation led to S07. An account was first requested at Save (S12); demo saving reached S11.
- **P2:** a simulated handoff failure led to S17; retry returned to S16 and opened the handoff dialog. Return without buying returned to S16. No actual merchant or financial action occurred.
- **P3:** the offers switch changed independently of availability consent. A simulated confirmed-deletion failure retained the piece and displayed an error. Retrying reached S10 with the removed-sample message. No external data was deleted.
- **Motion:** nine deterministic points were inspected. “Do” remained visible, the accessible name remained DoLaby, play/pause was observed, and Skip reached the static identity. Evidence: `motion-results.json`. Native reduced-motion preference remains untested unless separate runtime evidence is included.
- **Social editor:** one Arabic P02 text/image edit was saved and reopened successfully. Evidence and the exact download-listener limitation: `editor-roundtrip.json`.

These are bounded implementation checks. They are not user research, a full accessibility review or a security assessment.
