import { describe, expect, it } from 'vitest';
import { endpoint } from '../endpoint';

describe('endpoint', () => {
  it('should have masterData endpoints', () => {
    expect(endpoint.masterData).toBeDefined();
    expect(endpoint.masterData.postStatus).toBe('get-poststatus-master-xapi');
    expect(endpoint.masterData.ntlRegion).toBe('get-ntlregion-master-xapi');
    expect(endpoint.masterData.position).toBe('get-position-master-xapi');
    expect(endpoint.masterData.district).toBe('get-district-master-xapi');
    expect(endpoint.masterData.department).toBe('get-department-master-xapi');
    expect(endpoint.masterData.section).toBe('get-section-master-xapi');
    expect(endpoint.masterData.province).toBe('get-province-master-xapi');
    expect(endpoint.masterData.jobLevel).toBe('get-joblevel-master-xapi');
    expect(endpoint.masterData.degree).toBe('get-degree-master-xapi');
    expect(endpoint.masterData.employeeType).toBe('get-employeetype-master-xapi');
    expect(endpoint.masterData.users).toBe('get-users-xapi');
    expect(endpoint.masterData.skill).toBe('get-skill-master-xapi');
    expect(endpoint.masterData.titleName).toBe('get-title-name-master-xapi');
    expect(endpoint.masterData.documentType).toBe('get-document-type-master-xapi');
  });

  it('should have jobpost endpoints', () => {
    expect(endpoint.jobpost).toBeDefined();
    expect(endpoint.jobpost.list).toBe('get-jobpost-list-xapi');
    expect(endpoint.jobpost.create).toBe('create-jobpost-xapi');
    expect(endpoint.jobpost.detail).toBe('get-jobpost-xapi');
    expect(endpoint.jobpost.updateStatus).toBe('update-jobpost-status-xapi');
    expect(endpoint.jobpost.update).toBe('update-jobpost-xapi');
  });

  it('should have user endpoints', () => {
    expect(endpoint.user).toBeDefined();
    expect(endpoint.user.list).toBe('get-users-xapi');
  });

  it('should have candidate endpoints', () => {
    expect(endpoint.candidate).toBeDefined();
    expect(endpoint.candidate.list).toBe('get-candidates-list-xapi');
    expect(endpoint.candidate.detail).toBe('get-candidate-xapi');
    expect(endpoint.candidate.updateInfo).toBe('update-candidate-xapi');
    expect(endpoint.candidate.updateStatus).toBe('update-candidate-status-xapi');
    expect(endpoint.candidate.updateBlacklist).toBe('update-candidate-blacklist-xapi');
    expect(endpoint.candidate.updateNote).toBe('update-candidate-note-xapi');
    expect(endpoint.candidate.document).toBe('get-document-xapi');
  });
});
