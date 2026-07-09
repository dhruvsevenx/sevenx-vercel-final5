#!/usr/bin/env python3
"""
Backend API Test Suite for SevenX FastAPI Backend
Tests Vercel-compatible lazy MongoDB initialization
"""
import requests
import json
from datetime import datetime

# Backend URL (internal supervisor port)
BASE_URL = "http://localhost:8001"

def test_root_endpoint():
    """Test GET /api/ - should return 200 with message and mongo_enabled"""
    print("\n" + "="*70)
    print("TEST 1: GET /api/")
    print("="*70)
    
    try:
        # Include Origin header to trigger CORS
        headers = {"Origin": "http://localhost:3000"}
        response = requests.get(f"{BASE_URL}/api/", headers=headers)
        print(f"Status Code: {response.status_code}")
        print(f"Headers: {dict(response.headers)}")
        print(f"Response Body: {response.text}")
        
        # Check status code
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        # Check JSON response
        data = response.json()
        assert "message" in data, "Response missing 'message' key"
        assert "mongo_enabled" in data, "Response missing 'mongo_enabled' key"
        assert data["mongo_enabled"] == False, f"Expected mongo_enabled=false, got {data['mongo_enabled']}"
        
        # Check CORS headers
        assert "access-control-allow-origin" in response.headers, "Missing CORS header"
        
        print("✅ PASSED: GET /api/ returns correct response")
        return True
    except Exception as e:
        print(f"❌ FAILED: {str(e)}")
        return False


def test_health_endpoint():
    """Test GET /api/health - should return 200 with status, mongo_enabled, timestamp"""
    print("\n" + "="*70)
    print("TEST 2: GET /api/health")
    print("="*70)
    
    try:
        # Include Origin header to trigger CORS
        headers = {"Origin": "http://localhost:3000"}
        response = requests.get(f"{BASE_URL}/api/health", headers=headers)
        print(f"Status Code: {response.status_code}")
        print(f"Headers: {dict(response.headers)}")
        print(f"Response Body: {response.text}")
        
        # Check status code
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        # Check JSON response
        data = response.json()
        assert "status" in data, "Response missing 'status' key"
        assert data["status"] == "ok", f"Expected status='ok', got {data['status']}"
        assert "mongo_enabled" in data, "Response missing 'mongo_enabled' key"
        assert data["mongo_enabled"] == False, f"Expected mongo_enabled=false, got {data['mongo_enabled']}"
        assert "timestamp" in data, "Response missing 'timestamp' key"
        
        # Validate timestamp format
        try:
            datetime.fromisoformat(data["timestamp"].replace('Z', '+00:00'))
        except:
            raise AssertionError(f"Invalid timestamp format: {data['timestamp']}")
        
        # Check CORS headers
        assert "access-control-allow-origin" in response.headers, "Missing CORS header"
        
        print("✅ PASSED: GET /api/health returns correct response")
        return True
    except Exception as e:
        print(f"❌ FAILED: {str(e)}")
        return False


def test_docs_endpoint():
    """Test GET /api/docs - should return 200 with Swagger UI HTML"""
    print("\n" + "="*70)
    print("TEST 3: GET /api/docs")
    print("="*70)
    
    try:
        response = requests.get(f"{BASE_URL}/api/docs")
        print(f"Status Code: {response.status_code}")
        print(f"Content-Type: {response.headers.get('content-type')}")
        print(f"Response Length: {len(response.text)} bytes")
        print(f"First 200 chars: {response.text[:200]}")
        
        # Check status code
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        # Check it's HTML
        assert "text/html" in response.headers.get("content-type", ""), "Expected HTML content-type"
        
        # Check for Swagger UI indicators
        assert "swagger" in response.text.lower() or "openapi" in response.text.lower(), \
            "Response doesn't appear to be Swagger UI"
        
        print("✅ PASSED: GET /api/docs returns Swagger UI")
        return True
    except Exception as e:
        print(f"❌ FAILED: {str(e)}")
        return False


def test_post_status_without_mongo():
    """Test POST /api/status - should return 503 when MongoDB not configured"""
    print("\n" + "="*70)
    print("TEST 4: POST /api/status (without MongoDB)")
    print("="*70)
    
    try:
        payload = {"client_name": "test-ci"}
        # Include Origin header to trigger CORS
        headers = {
            "Content-Type": "application/json",
            "Origin": "http://localhost:3000"
        }
        response = requests.post(
            f"{BASE_URL}/api/status",
            json=payload,
            headers=headers
        )
        print(f"Status Code: {response.status_code}")
        print(f"Headers: {dict(response.headers)}")
        print(f"Response Body: {response.text}")
        
        # Check status code
        assert response.status_code == 503, f"Expected 503, got {response.status_code}"
        
        # Check JSON response
        data = response.json()
        assert "detail" in data, "Response missing 'detail' key"
        assert "MongoDB is not configured" in data["detail"], \
            f"Expected MongoDB error message, got: {data['detail']}"
        assert "MONGO_URL" in data["detail"], \
            f"Expected MONGO_URL mention in error, got: {data['detail']}"
        
        # Check CORS headers
        assert "access-control-allow-origin" in response.headers, "Missing CORS header"
        
        print("✅ PASSED: POST /api/status correctly returns 503 without MongoDB")
        return True
    except Exception as e:
        print(f"❌ FAILED: {str(e)}")
        return False


def test_get_status_without_mongo():
    """Test GET /api/status - should return 503 when MongoDB not configured"""
    print("\n" + "="*70)
    print("TEST 5: GET /api/status (without MongoDB)")
    print("="*70)
    
    try:
        # Include Origin header to trigger CORS
        headers = {"Origin": "http://localhost:3000"}
        response = requests.get(f"{BASE_URL}/api/status", headers=headers)
        print(f"Status Code: {response.status_code}")
        print(f"Headers: {dict(response.headers)}")
        print(f"Response Body: {response.text}")
        
        # Check status code
        assert response.status_code == 503, f"Expected 503, got {response.status_code}"
        
        # Check JSON response
        data = response.json()
        assert "detail" in data, "Response missing 'detail' key"
        assert "MongoDB is not configured" in data["detail"], \
            f"Expected MongoDB error message, got: {data['detail']}"
        assert "MONGO_URL" in data["detail"], \
            f"Expected MONGO_URL mention in error, got: {data['detail']}"
        
        # Check CORS headers
        assert "access-control-allow-origin" in response.headers, "Missing CORS header"
        
        print("✅ PASSED: GET /api/status correctly returns 503 without MongoDB")
        return True
    except Exception as e:
        print(f"❌ FAILED: {str(e)}")
        return False


def main():
    """Run all backend tests"""
    print("\n" + "="*70)
    print("SEVENX BACKEND API TEST SUITE")
    print("Testing Vercel-compatible FastAPI backend with lazy MongoDB")
    print("="*70)
    
    results = []
    
    # Run all tests
    results.append(("GET /api/", test_root_endpoint()))
    results.append(("GET /api/health", test_health_endpoint()))
    results.append(("GET /api/docs", test_docs_endpoint()))
    results.append(("POST /api/status", test_post_status_without_mongo()))
    results.append(("GET /api/status", test_get_status_without_mongo()))
    
    # Summary
    print("\n" + "="*70)
    print("TEST SUMMARY")
    print("="*70)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{status}: {test_name}")
    
    print(f"\nTotal: {passed}/{total} tests passed")
    
    if passed == total:
        print("\n🎉 ALL TESTS PASSED!")
        return 0
    else:
        print(f"\n⚠️  {total - passed} test(s) failed")
        return 1


if __name__ == "__main__":
    exit(main())
