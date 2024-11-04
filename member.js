function skillsMember() {
  return {
    skills: ['JavaScript', 'React', 'Node'],
    addSkill: function(skill) {
      this.skills.push(skill);
    }
  };
}
