# SQL Employee Tracker

## Description

SQL Employee Tracker is a command-line application that allows users to manage a company's employee database. It enables users to view and manage departments, roles, and employees using Node.js, Inquirer, and PostgreSQL.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation

1.  Clone the repository to your local machine:
    ```bash
    git clone https://github.com/michaelpratt23/12-SQL-Employee-Tracker.git
    ```
2.  Navigate to the project directory by running the following command in your terminal:
    ```bash
    cd 12-SQL-Employee-Tracker
    ```
3.  Install the required dependencies by running the following command:
    ```bash
    npm install
    ```
4.  Set up your PostgreSQL database:

    - Create a new database named `employee_tracker`:

      ```sql
      CREATE DATABASE employee_tracker;
      ```

    - Run the `schema.sql` file to set up the database structure:

      ```bash
      psql -U your_username -d employee_tracker -f db/schema.sql
      ```

    - (Optional) Populate the database with sample data by running the `seeds.sql` file:
      ```bash
      psql -U your_username -d employee_tracker -f db/seeds.sql
      ```

    Replace `your_username` with your PostgreSQL username.

5.  Create a `.env` file in the root of the project and add the following variables:

        DB_USER=your_postgres_username
        DB_HOST=localhost
        DB_NAME=employee_tracker
        DB_PASSWORD=your_postgres_password
        DB_PORT=5432

    Replace `your_postgres_username` and `your_postgres_password` with your actual PostgreSQL credentials.

## Usage

To start the application, run the following command in your terminal:

```bash
node app.js
```

You will be presented with a menu that allows you to:

- View all departments
- View all roles
- View all employees
- Add a department
- Add a role
- Add an employee
- Update an employee role
- Exit the application

Follow the prompts to interact with the employee database.

---

### Demo

[Watch the Demo Video](https://drive.google.com/file/d/1mPqyukRNbFPhrboBB1x9zLtRxIBoiK61/view?usp=sharing)

---

## Features

- View all departments along with their IDs.
- View all roles with their titles, salaries, and associated departments.
- View all employees with their IDs, roles, departments, salaries, and managers.
- Add a new department, role, or employee to the database.
- Update an employee's role.

---

## Technologies Used

- **Node.js**: JavaScript runtime for backend development.
- **Inquirer.js**: Command-line interface for interactive prompts.
- **PostgreSQL**: Relational database to store employee, role, and department data.
- **Dotenv**: Secure management of environment variables.

---

## License

This project is licensed under the MIT License.

---

## Contributing

Contributions are welcome! If you would like to contribute, please fork the repository and submit a pull request. Any improvements or feature additions are greatly appreciated.

---

## Questions

If you have any questions or feedback, feel free to reach out via my GitHub profile:

[GitHub Profile](https://github.com/michaelpratt23)
