/**
 * specification test
 *
 * 1. create 3 uuid
 * 2. testing week rotation for error
 *    - if start date > end date (test case 1)
 * 3. testing day rotation for error
 *    - if start date > end date (test case 2)
 * 4. testing term for error
 *    - check if term is in order (test case 3)
 *    - check from second term onward if term overlap each other
 * 5. testing academic year for error
 *    - for week rotation
 *      - check if week rotation date is between academic date (test case 4)
 *    - for day rotation
 *      - check if day rotation date is between academic date (test case 5)
 *    - for term
 *      - check if all term interval is between the academic date (test case 6)
 */
