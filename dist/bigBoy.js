(() => {
  "use strict";
  ({
    752: function () {
      var e,
        t =
          (this && this.__decorate) ||
          function (e, t, n, r) {
            var s,
              i = arguments.length,
              o =
                i < 3
                  ? t
                  : null === r
                  ? (r = Object.getOwnPropertyDescriptor(t, n))
                  : r;
            if (
              "object" == typeof Reflect &&
              "function" == typeof Reflect.decorate
            )
              o = Reflect.decorate(e, t, n, r);
            else
              for (var a = e.length - 1; a >= 0; a--)
                (s = e[a]) &&
                  (o = (i < 3 ? s(o) : i > 3 ? s(t, n, o) : s(t, n)) || o);
            return i > 3 && o && Object.defineProperty(t, n, o), o;
          };
      !(function (e) {
        let t;
        !(function (e) {
          (e[(e.Active = 0)] = "Active"), (e[(e.Finished = 1)] = "Finished");
        })((t = e.ProjectStatus || (e.ProjectStatus = {}))),
          (e.Project = class {
            constructor(e, t, n, r, s) {
              (this.id = e),
                (this.title = t),
                (this.description = n),
                (this.people = r),
                (this.status = s);
            }
          });
      })(e || (e = {})),
        (function (e) {
          class t extends class {
            constructor() {
              this.listeners = [];
            }
            addListener(e) {
              this.listeners.push(e);
            }
          } {
            constructor() {
              super(), (this.projects = []);
            }
            static getInstance() {
              return this.instance || (this.instance = new t()), this.instance;
            }
            addProject(t, n, r) {
              const s = new e.Project(
                Math.random().toString(),
                t,
                n,
                r,
                e.ProjectStatus.Active
              );
              this.projects.push(s);
              for (const e of this.listeners)
                e(this.projects.slice()), this.updateListeners();
            }
            moveProject(e, t) {
              const n = this.projects.find((t) => t.id === e);
              n && ((n.status = t), this.updateListeners());
            }
            updateListeners() {
              for (const e of this.listeners) e(this.projects.slice());
            }
          }
          (e.ProjectState = t), (e.projectState = t.getInstance());
        })(e || (e = {})),
        (function (e) {
          e.validate = function (e) {
            let t = !0;
            return (
              e.required && (t = t && 0 !== e.value.toString().trim().length),
              null != e.minLength &&
                "string" == typeof e.value &&
                (t = t && e.value.length > e.minLength),
              null != e.maxLength &&
                "string" == typeof e.value &&
                (t = t && e.value.length < e.maxLength),
              null != e.min &&
                "number" == typeof e.value &&
                (t = t && e.value > e.min),
              null != e.max &&
                "number" == typeof e.value &&
                (t = t && e.value < e.max),
              t
            );
          };
        })(e || (e = {})),
        (function (e) {
          e.autoBind = function (e, t, n) {
            const r = n.value;
            return {
              configurable: !0,
              get() {
                return r.bind(this);
              },
            };
          };
        })(e || (e = {})),
        (function (e) {
          e.Component = class {
            constructor(e, t, n, r) {
              (this.templateElement = document.getElementById(e)),
                (this.hostElement = document.getElementById(t));
              const s = document.importNode(this.templateElement.content, !0);
              (this.element = s.firstElementChild),
                r && (this.element.id = r),
                this.attach(n);
            }
            attach(e) {
              this.hostElement.insertAdjacentElement(
                e ? "afterbegin" : "beforeend",
                this.element
              );
            }
          };
        })(e || (e = {})),
        (function (e) {
          class n extends e.Component {
            constructor(e, t) {
              super("single-project", e, !1, t.id),
                (this.project = t),
                this.configure(),
                this.renderContent();
            }
            get persons() {
              return 1 === this.project.people
                ? "1 person"
                : `${this.project.people} people`;
            }
            dragStartHandler(e) {
              e.dataTransfer.setData("text/plain", this.project.id),
                (e.dataTransfer.effectAllowed = "move");
            }
            dragEndHandler(e) {
              console.log("dragEnd");
            }
            configure() {
              this.element.addEventListener("dragstart", this.dragStartHandler);
            }
            renderContent() {
              (this.element.querySelector("h2").textContent =
                this.project.title),
                (this.element.querySelector(
                  "h3"
                ).textContent = `${this.persons} assigned`),
                (this.element.querySelector("p").textContent =
                  this.project.description.toString());
            }
          }
          t([e.autoBind], n.prototype, "dragStartHandler", null),
            (e.ProjectItem = n);
        })(e || (e = {})),
        (function (e) {
          class n extends e.Component {
            constructor(e) {
              super("project-list", "app", !1, `${e}-projects`),
                (this.type = e),
                (this.assignedProjects = []),
                this.configure(),
                this.renderContent();
            }
            renderProjects() {
              document.getElementById(`${this.type}-projects-list`).innerHTML =
                "";
              for (const t of this.assignedProjects)
                new e.ProjectItem(this.element.querySelector("ul").id, t);
            }
            dragOverHandler(e) {
              e.dataTransfer &&
                "text/plain" === e.dataTransfer.types[0] &&
                (e.preventDefault(),
                this.element.querySelector("ul").classList.add("droppable"));
            }
            dropHandler(t) {
              const n = t.dataTransfer.getData("text/plain");
              e.projectState.moveProject(
                n,
                "active" === this.type
                  ? e.ProjectStatus.Active
                  : e.ProjectStatus.Finished
              );
            }
            dragLeaveHandler(e) {
              this.element.querySelector("ul").classList.remove("droppable");
            }
            configure() {
              this.element.addEventListener("dragover", this.dragOverHandler),
                this.element.addEventListener(
                  "dragleave",
                  this.dragLeaveHandler
                ),
                this.element.addEventListener("drop", this.dropHandler),
                e.projectState.addListener((t) => {
                  const n = t.filter((t) =>
                    "active" === this.type
                      ? t.status === e.ProjectStatus.Active
                      : t.status === e.ProjectStatus.Finished
                  );
                  (this.assignedProjects = n), this.renderProjects();
                });
            }
            renderContent() {
              const e = `${this.type}-projects-list`;
              (this.element.querySelector("ul").id = e),
                (this.element.querySelector("h2").textContent =
                  this.type.toUpperCase() + " PROJECTS");
            }
          }
          t([e.autoBind], n.prototype, "dragOverHandler", null),
            t([e.autoBind], n.prototype, "dropHandler", null),
            t([e.autoBind], n.prototype, "dragLeaveHandler", null),
            (e.ProjectList = n);
        })(e || (e = {})),
        (function (e) {
          class n extends e.Component {
            constructor() {
              super("project-input", "app", !0, "user-input"),
                (this.titleInputElement = this.element.querySelector("#title")),
                (this.descriptionInputElement =
                  this.element.querySelector("#description")),
                (this.peopleInputElement =
                  this.element.querySelector("#people")),
                this.configure();
            }
            configure() {
              this.element.addEventListener("submit", this.submitHandler);
            }
            gatherUserInput() {
              const t = this.titleInputElement.value,
                n = this.descriptionInputElement.value,
                r = this.peopleInputElement.value,
                s = { value: t, required: !0 },
                i = { value: n, required: !0, minLength: 5 },
                o = { value: +r, required: !0, min: 1, max: 5 };
              return e.validate(s) || e.validate(i) || e.validate(o)
                ? [t, n, +r]
                : void alert("Invalid input, please try again!");
            }
            clearInputs() {
              (this.titleInputElement.value = ""),
                (this.descriptionInputElement.value = ""),
                (this.peopleInputElement.value = "");
            }
            submitHandler(t) {
              t.preventDefault();
              const n = this.gatherUserInput();
              if (Array.isArray(n)) {
                const [t, r, s] = n;
                e.projectState.addProject(t, r, s), this.clearInputs();
              }
            }
            renderContent() {}
          }
          t([e.autoBind], n.prototype, "submitHandler", null),
            (e.ProjectInput = n);
        })(e || (e = {})),
        (function (e) {
          new e.ProjectInput(),
            new e.ProjectList("active"),
            new e.ProjectList("finished");
        })(e || (e = {}));
    },
  }[752]());
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlnQm95LmpzIiwibWFwcGluZ3MiOiJtZ0xBSW9CLFEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kcmFnYW5kZHJvcC93ZWJwYWNrL3N0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbl9fd2VicGFja19tb2R1bGVzX19bNzUyXSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
