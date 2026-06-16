export function uniqueId(prefix = 'qa') {
  const worker = process.env.TEST_WORKER_INDEX ?? '0';
  return `${prefix}-${worker}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function buildEmployee() {
  const id = uniqueId('emp');

  return {
    employeeId: id,
    firstName: `Auto${id.slice(-5)}`,
    middleName: 'QA',
    lastName: 'Engineer',
    editedLastName: 'Lead'
  };
}

export function buildLeaveRequest() {
  const start = new Date();
  start.setDate(start.getDate() + 14);

  const end = new Date(start);
  end.setDate(start.getDate() + 1);

  return {
    leaveType: process.env.HRMS_LEAVE_TYPE ?? 'CAN - FMLA',
    fromDate: formatDate(start),
    toDate: formatDate(end),
    comment: `Automated leave request ${uniqueId('leave')}`
  };
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
}
