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

            // Display grouped subjects in a table
            for (let key in groupedCourses) {
                let container = document.createElement("div");

                let header = document.createElement("p");
                header.textContent = key;
                header.classList.add("collapsible");
                header.onclick = function () {
                    let content = this.nextElementSibling;
                    content.style.display = content.style.display === "none" ? "block" : "none";
                };

                let tableContainer = document.createElement("div");
                tableContainer.classList.add("course-content");
                tableContainer.style.display = "none"; // Hide courses initially

                // Create table structure
                let table = document.createElement("table");
                table.classList.add("course-table");

                // Table header
                let tableHeader = document.createElement("thead");
                let headerRow = document.createElement("tr");
                headerRow.innerHTML = `
                    <th>Course Code</th>
                    <th>Description</th>
                    <th>Credits</th>
                `;
                tableHeader.appendChild(headerRow);
                table.appendChild(tableHeader);

                // Table body
                let tableBody = document.createElement("tbody");
                groupedCourses[key].forEach(course => {
                    let row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${course.code}</td>
                        <td>${course.description}</td>
                        <td>${course.credit}</td>
                    `;
                    tableBody.appendChild(row);
                });

                table.appendChild(tableBody);
                tableContainer.appendChild(table);
                container.appendChild(header);
                container.appendChild(tableContainer);
                courseList.appendChild(container);
            }
        } else {
            console.error("Expected 'courses' array but got:", data);
        }
    })
    .catch(error => console.error("Error fetching JSON:", error));
