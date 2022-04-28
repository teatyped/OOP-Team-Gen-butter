const Employee = require ('../lib/Employee');

test ('Does this create an object', () => {
    const employee = new Employee();

    expect(typeof(employee)).toBe('object');
});

// break up this test
test ('create a employee name, id, email', () => {
    const employee = new Employee('Bob', 1, 'test@test.com');

    expect(employee.name).toBe('Bob');
    expect(employee.id).toBe(1);
    expect(employee.email).toBe('test@test.com');
    expect(employee.getName()).toBe('Bob');

    expect(employee.getRole()).toBe('Employee');
});