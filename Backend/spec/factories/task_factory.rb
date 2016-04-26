FactoryGirl.define do
  factory :task, class: Task do
    name "Task1"
    completed false
  end

  factory :invalid_attributes, class: Task do
    name nil
    completed false
  end

end
