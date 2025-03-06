fetch("courses.json")
    .then(response => response.json())
    .then(data => {
        let courseList = document.getElementById("course-list");
        courseList.innerHTML = ""; // Clear previous content

        if (data.courses && Array.isArray(data.courses)) {
            let groupedCourses = {};

            // Group subjects by year and semester
            data.courses.forEach(course => {
                let key = `${course.year_level} Year - ${course.sem} Semester`;
                if (!groupedCourses[key]) {
                    groupedCourses[key] = [];
                }
                groupedCourses[key].push(course);
            });

            // Display grouped subjects
            for (let key in groupedCourses) {
                let container = document.createElement("div");

                let header = document.createElement("p");
                header.textContent = key;
                header.classList.add("collapsible");
                header.onclick = function () {
                    let content = this.nextElementSibling;
                    content.style.display = content.style.display === "none" ? "block" : "none";
                };

                let sublist = document.createElement("ul");
                sublist.classList.add("course-content");
                sublist.style.display = "none"; // Hide courses

                groupedCourses[key].forEach(course => {
                    let listItem = document.createElement("li");
                    listItem.innerHTML = `<strong>${course.code} - ${course.description}</strong> <br>
                                          <em>Credits: ${course.credit}</em>`;
                    sublist.appendChild(listItem);
                });

                container.appendChild(header);
                container.appendChild(sublist);
                courseList.appendChild(container);
            }
        } else {
            console.error("Expected 'courses' array but got:", data);
        }
    })
    .catch(error => console.error("Error fetching JSON:", error));
