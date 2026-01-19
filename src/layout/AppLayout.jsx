[{
	"resource": "/D:/bvas/frontend/src/bills/BillDetails.jsx",
	"owner": "eslint1",
	"code": {
		"value": "no-unused-vars",
		"target": {
			"$mid": 1,
			"path": "/docs/latest/rules/no-unused-vars",
			"scheme": "https",
			"authority": "eslint.org"
		}
	},
	"severity": 8,
	"message": "'canResubmit' is assigned a value but never used. Allowed unused vars must match /^[A-Z_]/u.",
	"source": "eslint",
	"startLineNumber": 40,
	"startColumn": 9,
	"endLineNumber": 40,
	"endColumn": 20,
	"modelVersionId": 14,
	"tags": [
		1
	],
	"origin": "extHost1"
},{
	"resource": "/D:/bvas/frontend/src/bills/BillDetails.jsx",
	"owner": "eslint1",
	"code": {
		"value": "react-hooks/exhaustive-deps",
		"target": {
			"$mid": 1,
			"path": "/facebook/react/issues/14920",
			"scheme": "https",
			"authority": "github.com"
		}
	},
	"severity": 4,
	"message": "React Hook useEffect has a missing dependency: 'loadBill'. Either include it or remove the dependency array.",
	"source": "eslint",
	"startLineNumber": 32,
	"startColumn": 6,
	"endLineNumber": 32,
	"endColumn": 14,
	"modelVersionId": 14,
	"origin": "extHost1"
},{
	"resource": "/D:/bvas/frontend/src/bills/HQBillDetails.jsx",
	"owner": "eslint1",
	"code": "react-hooks/immutability",
	"severity": 8,
	"message": "Error: Cannot access variable before it is declared\n\n`loadBill` is accessed before it is declared, which prevents the earlier access from updating when this value changes over time.\n\n   9 |\n  10 |   useEffect(() => {\n> 11 |     loadBill();\n     |     ^^^^^^^^ `loadBill` accessed before it is declared\n  12 |   }, [billId]);\n  13 |\n  14 |   async function loadBill() {\n\n  12 |   }, [billId]);\n  13 |\n> 14 |   async function loadBill() {\n     |   ^^^^^^^^^^^^^^^^^^^^^^^^^^^\n> 15 |     try {\n     | ^^^^^^^^^\n> 16 |       const res = await api.get(`/hq/bills/${billId}`);\n     | ^^^^^^^^^\n> 17 |       setData(res.data);\n     | ^^^^^^^^^\n> 18 |     } catch (err) {\n     | ^^^^^^^^^\n> 19 |       alert(\"Failed to load bill details\");\n     | ^^^^^^^^^\n> 20 |     }\n     | ^^^^^^^^^\n> 21 |   }\n     | ^^^^ `loadBill` is declared here\n  22 |\n  23 |   async function unlockBill() {\n  24 |     if (!window.confirm(\"Unlock this bill?\")) return;",
	"source": "eslint",
	"startLineNumber": 11,
	"startColumn": 5,
	"endLineNumber": 11,
	"endColumn": 13,
	"modelVersionId": 8,
	"origin": "extHost1"
},{
	"resource": "/D:/bvas/frontend/src/bills/HQBillDetails.jsx",
	"owner": "eslint1",
	"code": {
		"value": "no-unused-vars",
		"target": {
			"$mid": 1,
			"path": "/docs/latest/rules/no-unused-vars",
			"scheme": "https",
			"authority": "eslint.org"
		}
	},
	"severity": 8,
	"message": "'err' is defined but never used.",
	"source": "eslint",
	"startLineNumber": 18,
	"startColumn": 14,
	"endLineNumber": 18,
	"endColumn": 17,
	"modelVersionId": 8,
	"tags": [
		1
	],
	"origin": "extHost1"
},{
	"resource": "/D:/bvas/frontend/src/bills/HQBillDetails.jsx",
	"owner": "eslint1",
	"code": {
		"value": "react-hooks/exhaustive-deps",
		"target": {
			"$mid": 1,
			"path": "/facebook/react/issues/14920",
			"scheme": "https",
			"authority": "github.com"
		}
	},
	"severity": 4,
	"message": "React Hook useEffect has a missing dependency: 'loadBill'. Either include it or remove the dependency array.",
	"source": "eslint",
	"startLineNumber": 12,
	"startColumn": 6,
	"endLineNumber": 12,
	"endColumn": 14,
	"modelVersionId": 8,
	"origin": "extHost1"
},{
	"resource": "/D:/bvas/frontend/src/dashboards/HQDashboard.jsx",
	"owner": "eslint1",
	"code": {
		"value": "no-unused-vars",
		"target": {
			"$mid": 1,
			"path": "/docs/latest/rules/no-unused-vars",
			"scheme": "https",
			"authority": "eslint.org"
		}
	},
	"severity": 8,
	"message": "'err' is defined but never used.",
	"source": "eslint",
	"startLineNumber": 19,
	"startColumn": 14,
	"endLineNumber": 19,
	"endColumn": 17,
	"modelVersionId": 9,
	"tags": [
		1
	],
	"origin": "extHost1"
},{
	"resource": "/D:/bvas/frontend/src/dashboards/HQDashboard.jsx",
	"owner": "eslint1",
	"code": {
		"value": "no-unused-vars",
		"target": {
			"$mid": 1,
			"path": "/docs/latest/rules/no-unused-vars",
			"scheme": "https",
			"authority": "eslint.org"
		}
	},
	"severity": 8,
	"message": "'handleLogout' is defined but never used. Allowed unused vars must match /^[A-Z_]/u.",
	"source": "eslint",
	"startLineNumber": 56,
	"startColumn": 12,
	"endLineNumber": 56,
	"endColumn": 24,
	"modelVersionId": 9,
	"tags": [
		1
	],
	"origin": "extHost1"
},{
	"resource": "/D:/bvas/frontend/src/dashboards/VendorDashboard.jsx",
	"owner": "eslint1",
	"code": {
		"value": "no-unused-vars",
		"target": {
			"$mid": 1,
			"path": "/docs/latest/rules/no-unused-vars",
			"scheme": "https",
			"authority": "eslint.org"
		}
	},
	"severity": 8,
	"message": "'err' is defined but never used.",
	"source": "eslint",
	"startLineNumber": 17,
	"startColumn": 14,
	"endLineNumber": 17,
	"endColumn": 17,
	"modelVersionId": 12,
	"tags": [
		1
	],
	"origin": "extHost1"
},{
	"resource": "/D:/bvas/frontend/src/dashboards/VendorDashboard.jsx",
	"owner": "eslint1",
	"code": {
		"value": "no-unused-vars",
		"target": {
			"$mid": 1,
			"path": "/docs/latest/rules/no-unused-vars",
			"scheme": "https",
			"authority": "eslint.org"
		}
	},
	"severity": 8,
	"message": "'handleLogout' is defined but never used. Allowed unused vars must match /^[A-Z_]/u.",
	"source": "eslint",
	"startLineNumber": 28,
	"startColumn": 12,
	"endLineNumber": 28,
	"endColumn": 24,
	"modelVersionId": 12,
	"tags": [
		1
	],
	"origin": "extHost1"
},{
	"resource": "/D:/bvas/frontend/src/dashboards/VerifierDashboard.jsx",
	"owner": "eslint1",
	"code": {
		"value": "no-unused-vars",
		"target": {
			"$mid": 1,
			"path": "/docs/latest/rules/no-unused-vars",
			"scheme": "https",
			"authority": "eslint.org"
		}
	},
	"severity": 8,
	"message": "'handleLogout' is defined but never used. Allowed unused vars must match /^[A-Z_]/u.",
	"source": "eslint",
	"startLineNumber": 77,
	"startColumn": 12,
	"endLineNumber": 77,
	"endColumn": 24,
	"modelVersionId": 18,
	"tags": [
		1
	],
	"origin": "extHost1"
},{
	"resource": "/D:/bvas/frontend/src/bills/CreateBill.jsx",
	"owner": "eslint1",
	"code": {
		"value": "no-unused-vars",
		"target": {
			"$mid": 1,
			"path": "/docs/latest/rules/no-unused-vars",
			"scheme": "https",
			"authority": "eslint.org"
		}
	},
	"severity": 8,
	"message": "'err' is defined but never used.",
	"source": "eslint",
	"startLineNumber": 53,
	"startColumn": 14,
	"endLineNumber": 53,
	"endColumn": 17,
	"modelVersionId": 9,
	"tags": [
		1
	],
	"origin": "extHost1"
},{
	"resource": "/D:/bvas/frontend/src/bills/CreateBill.jsx",
	"owner": "eslint1",
	"code": {
		"value": "no-empty",
		"target": {
			"$mid": 1,
			"path": "/docs/latest/rules/no-empty",
			"scheme": "https",
			"authority": "eslint.org"
		}
	},
	"severity": 8,
	"message": "Empty block statement.",
	"source": "eslint",
	"startLineNumber": 53,
	"startColumn": 19,
	"endLineNumber": 55,
	"endColumn": 6,
	"modelVersionId": 9,
	"origin": "extHost1"
},{
	"resource": "/D:/bvas/frontend/src/layout/AppLayout.jsx",
	"owner": "eslint1",
	"code": "react-hooks/immutability",
	"severity": 8,
	"message": "Error: This value cannot be modified\n\nModifying a variable defined outside a component or hook is not allowed. Consider using an effect.\n\n  10 |   if (!user) {\n  11 |     logout();\n> 12 |     window.location.href = \"/\";\n     |     ^^^^^^^^^^^^^^^ value cannot be modified\n  13 |     return null;\n  14 |   }\n  15 |",
	"source": "eslint",
	"startLineNumber": 12,
	"startColumn": 5,
	"endLineNumber": 12,
	"endColumn": 20,
	"modelVersionId": 3,
	"origin": "extHost1"
}]